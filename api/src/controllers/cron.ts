import tournaments from './tournaments'
import users from './users'
import axios from 'axios';
import * as cron from 'node-cron';
import _ from 'underscore';
import {protectedRoutes} from '../../credentials.json';



class Cron {
    private isTournamentCronInProgress : boolean = false;
    private isUserCronInProgress : boolean = false;
    private secondsEachTournamentCron : number = 20;
    private hoursEachUserCron : number = 23;
    private tournamentsToUpdate : Array<object>;
    private usersToUpdate : Array<any>

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
    
    
                    this.isTournamentCronInProgress = false;
                }
            })
            .catch((err) => {
                return;
            })
        }
    }

    private usersCRON = {
        prepareToUpdate: async () => {
            this.usersToUpdate = await users.displayAll();
            this.isUserCronInProgress = true;
        },
        getNewInfo: async (userId: number) => {
          const {cover_url, statistics} = await users.getUserApiInfo(userId);
          return {cover_url, statistics};
        },
        update: async () => {
            for await(let {id} of this.usersToUpdate){
                const newApiInfo = await this.usersCRON.getNewInfo(id);
                console.log(newApiInfo);
            }
            this.isUserCronInProgress = false;
        }
    }

    public start = async () => {
        /* User info update */
        cron.schedule(`*/${this.hoursEachUserCron} * * * * * *`, async () => {
            if( !this.isTournamentCronInProgress ) {
                await this.usersCRON.prepareToUpdate();
                await this.usersCRON.update();
            }
        })

        /* Tournaments fetch and update */
        cron.schedule(`*/${this.secondsEachTournamentCron} * * * * *`, async () => {
            if( !this.isTournamentCronInProgress || !this.isUserCronInProgress ){
                await this.tournamentsCRON.prepareToUpdate();
                await this.tournamentsCRON.update();
                await this.tournamentsCRON.lookForNew();
            }
        })
    };
}

export = new Cron();



