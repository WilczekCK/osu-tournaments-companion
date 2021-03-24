import osuApi from './osuApi';
import mongo from './mongo';
import tournaments from './tournaments';
import users from './users';
import axios from 'axios';
import * as cron from 'node-cron';
import _ from 'underscore';

class Cron {
    private isCronInProgress : boolean = false;
    private secondsEachCron : number = 30;
    private tournamentsToUpdate : Array<object>;

    private prepareToUpdate = async () => {
        this.tournamentsToUpdate = await tournaments.displayCertain({'timeEnded': null});
        this.isCronInProgress = true;
    };

    private compareTournaments = async (matchInfo: object | object, tournament: object) => {
        const differences = _.difference([matchInfo], [tournament]);
        const {id} : {id?:number} = tournament;

        for await(let difference of _.flatten(differences)){
            await tournaments.update({
                whereQuery:{},
                modifyQuery:{}
            })
        }
    }

    private updateTournaments = async () => {
        
        type roomInfo = {
            detail?: any,
            game?: any,
            user_id?: number,
        }

        for await(let tournament of this.tournamentsToUpdate){
            const {id} : {id?:number} = tournament;
            
            await axios.get(`/tournaments/${id}?osuApi=true`)
                .then( async ( {data} ) => {
                    let {match, events, users} = data;
                    let [{judge}, plays] = await tournaments.parseEventsObject( events );

                    this.compareTournaments({match, users, judge, plays}, tournament);
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



