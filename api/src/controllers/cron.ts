import osuApi from './osuApi';
import mongo from './mongo';
import tournaments from './tournaments';
import users from './users';
import axios from 'axios';
import * as cron from 'node-cron';

class Cron {
    private isCronInProgress : boolean = false;
    private secondsEachCron : number = 30;
    private tournamentsToUpdate : Array<object>;

    private prepareToUpdate = async () => {
        this.tournamentsToUpdate = await tournaments.displayCertain({'timeEnded': null});
        this.isCronInProgress = true;
    };

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

                    //@ts-ignore
                    console.log({new:plays, old: tournament.mapsPlayed})
                })
                .catch((err) => {
                    console.log(err);
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



