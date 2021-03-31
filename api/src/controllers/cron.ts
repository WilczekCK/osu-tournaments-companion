import osuApi from './osuApi';
import mongo from './mongo';
import tournaments from './tournaments';
import users from './users';
import axios from 'axios';
import * as cron from 'node-cron';
import * as tournamentsTypes from '../validators/tournamentTypes';
import _ from 'underscore';
import {protectedRoutes} from '../../credentials.json';



class Cron {
    private isCronInProgress : boolean = false;
    private secondsEachCron : number = 25;
    private tournamentsToUpdate : Array<object>;

    private prepareToUpdate = async () => {
        this.tournamentsToUpdate = await tournaments.displayCertain({'timeEnded': null});
        this.isCronInProgress = true;
    };

    private compareTournaments = async (matchInfo: object | object, tournament: object) => {
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
        
    }

    private updateTournaments = async () => {
    

        for await(let tournament of this.tournamentsToUpdate){
            const {id} : {id?:number} = tournament;
            
            await axios.get(`/tournaments/${id}?osuApi=true`)
                .then( async ( {data} ) => {
                    let {match, events, users} = data;
                    let [{judge}, {gameModes}, {beatmap: mapsPlayed}] = await tournaments.parseEventsObject( events );
                    
                    
                    let {end_time: timeEnded} = match;
                    console.log(timeEnded);

                    await this.compareTournaments(
                        {timeEnded, users, judge, mapsPlayed, gameModes},
                        tournament
                        );
                })
                .catch((err) => {
                    return;
                    //console.log(err);
                })
        }
        this.isCronInProgress = false;
        return;
    };
    
    public start = async () => {
        cron.schedule(`*/${this.secondsEachCron} * * * * *`, async () => {
            
            if( !this.isCronInProgress ){
                await this.prepareToUpdate();
                await this.updateTournaments();
            }

        })
    };
}

export = new Cron();



