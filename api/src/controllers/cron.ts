import osuApi from './osuApi';
import mongo from './mongo';
import tournaments from './tournaments';
import users from './users';
import * as cron from 'node-cron';

class Cron {
    public start = async () => {
        cron.schedule('*/30 * * * * *', async () => {
            console.log(await tournaments.displayCertain({'timeEnded': null}));
        })
    }
}

export = new Cron();



