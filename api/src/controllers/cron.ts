import osuApi from './osuApi';
import mongo from './mongo';
import tournaments from './tournaments';
import users from './users';
import * as cron from 'node-cron';

class Cron {
    private isInProgress : boolean = false;
    private secondsEachCron : number = 30;
    private tournamentsToUpdate : Array<object>;
    
    public start = async () => {
        cron.schedule(`*/${this.secondsEachCron} * * * * *`, async () => {
            console.log(await tournaments.displayCertain({'timeEnded': null}));
        })
    }
}

export = new Cron();



