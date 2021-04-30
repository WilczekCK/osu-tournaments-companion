import tournaments from './tournaments'
import users from './users'
import axios from 'axios';
import * as cron from 'node-cron';
import _ from 'underscore';
import {protectedRoutes} from '../../credentials.json';



class Cron {
    private isTournamentCronInProgress : boolean = false;
    private isUserCronInProgress : boolean = false;
    
    private secondsEachTournamentCron : number = 60;
    private hoursEachUserCron : number = 23;
    
    private tournamentsToUpdate : Array<object>;
    private usersToUpdate : Array<any>

    private tournamentsToRemove : Array<object | any>;

    private tournamentsCRON = {
        prepareToUpdate: async () => {
            this.tournamentsToUpdate = await tournaments.displayCertain({'timeEnded': null});
            this.isTournamentCronInProgress = true;
        },
        compare: async (matchInfo: object | object, tournament: object) => {
            const differences = _.difference([matchInfo], [tournament]);
            const {id} : {id?:number} = tournament;
    
            for await(let difference of _.pairs(differences[0])){
                const result = _.values(difference);
                let name = result[0];
                let value = result[1];
    
                await axios({
                    url: `/tournaments/m/${id}`,
                    method: 'PATCH',
                    data: { 
                        prefix: name,
                        content: value
                    },
                    auth: {
                        username: protectedRoutes.username,
                        password: protectedRoutes.password
                    }
                })
    
            }
        },
        update: async () => {
            for await(let tournament of this.tournamentsToUpdate){
                const {id} : {id?:number} = tournament;
                
                await axios.get(`/tournaments/${id}?osuApi=true`)
                    .then( async ( {data} ) => {
                        let {match, events, users} = data;
                        let {end_time: timeEnded}  = match;
                        let [{judge}, {gameModes}, {playedBeatmaps: mapsPlayed}] = await tournaments.parseEventsObject( events );
    
                        let teams = {...await tournaments.sortTeams( mapsPlayed ), names: tournaments.getTeamsName(match.name)};
                        
                        await this.tournamentsCRON.compare(
                            {timeEnded, users, judge, mapsPlayed, gameModes, events, teams},
                            tournament
                        );
                    })
                    .catch((err) => {
                        return;
                    })
            }
            return;
        },
        lookForNew: async () => {
            await axios.get(`/tournaments/?osuApi=true`)
            .then( async ( {data} ) => {
                for await(let match of data.matches){
                    if(tournaments.isTournament(match.name)){
                        await axios({
                            url: `/tournaments/m/${match.id}`,
                            method: 'POST',
                            auth: {
                                username: protectedRoutes.username,
                                password: protectedRoutes.password
                            }
                        })
                    }
                }
            })
            .catch((err) => {
                return;
            })
        },
        removeWithoutPlays: async () => {
            this.tournamentsToRemove = await tournaments.displayCertain({$and: [{ 'mapsPlayed':{$eq: []} }, { 'timeEnded': {$not:{$eq: null}} }] });
            
            for await(let {id} of this.tournamentsToRemove){
                await tournaments.delete(id);
            }

            this.isTournamentCronInProgress = false;
        }
    }

    private usersCRON = {
        prepareToUpdate: async () => {
            this.usersToUpdate = await users.displayAll();
            this.isUserCronInProgress = true;
        },
        getNewInfo: async (userId: number) => {
          const {cover_url, statistics, playmode} = await users.getUserApiInfo(userId);
          const {global_rank, country_rank} = statistics;

          return [{coverUrl: cover_url}, {playMode: playmode}, {ranking:{global: global_rank, country: country_rank}}];
        },
        update: async () => {
            for await(let {id} of this.usersToUpdate){
                const newInfo = await this.usersCRON.getNewInfo(id);

                for await(let info of newInfo){
                    let attrName = _.keys(info)[0];
                    let attrVal = _.values(info)[0];

                    await axios({
                        url: `/users/m/${id}`,
                        method: 'PATCH',
                        data: { 
                            prefix: attrName,
                            content: attrVal
                        },
                        auth: {
                            username: protectedRoutes.username,
                            password: protectedRoutes.password
                        }
                    })

                    //give a osu!api some rest, .3s each user!
                    await new Promise(resolve => setTimeout(resolve, 300));
                } 
            }
            this.isUserCronInProgress = false;
        }
    }

    public start = async () => {
        /* User info update */
        cron.schedule(`0 0 ${this.hoursEachUserCron} * * *`, async () => {
            if( !this.isUserCronInProgress ) {
                await this.usersCRON.prepareToUpdate();
                await this.usersCRON.update();
            }
        })

        /* Tournaments fetch and update */
        cron.schedule(`*/${this.secondsEachTournamentCron} * * * * *`, async () => {
            if( !this.isTournamentCronInProgress && !this.isUserCronInProgress ){
                await this.tournamentsCRON.prepareToUpdate();
                await this.tournamentsCRON.update();
                await this.tournamentsCRON.lookForNew();
                await this.tournamentsCRON.removeWithoutPlays();
            }
        })
    };
}

export = new Cron();



