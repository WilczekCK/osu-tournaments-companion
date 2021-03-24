import osuApi from './osuApi';
import mongo from './mongo';
import tournaments from './tournaments';
import users from './users';
import * as cron from 'node-cron';

class Cron {
    private isInProgress : boolean = false;
    private secondsEachCron : number = 30;
    private tournamentsToUpdate : Array<object>;

    private checkIfPreviousCronEnded = async () => {
        return;
    };

    private prepareToUpdate = async () => {
        this.tournamentsToUpdate = await tournaments.displayCertain({'timeEnded': null});
        this.isInProgress = true;
    };

    private updateTournaments = async () => {
        return;
    };
    
    public start = async () => {
        cron.schedule(`*/${this.secondsEachCron} * * * * *`, async () => {
            this.checkIfPreviousCronEnded();
            this.prepareToUpdate();
            this.updateTournaments();
        })
    };
}

export = new Cron();



