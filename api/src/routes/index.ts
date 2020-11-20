import Router from 'koa-router';
import tournamentsRoute from './tournaments/index';

import osuApi from '../controllers/osuApi';
import mongo from '../controllers/mongo';
import tournaments from '../controllers/tournaments';


const router = new Router();
router.use(tournamentsRoute)

router.get('/', async (ctx, next) => {
    //const askedInfo = await osuApi('users/2415342');
    //const allTournaments:Object = await tournaments.displayCertain({title: "Test"});

    const allTournaments = await tournaments.insert({
        id: 2,
        title: "My best tournament",
        titleFlattened: "MBT",
        teams: [12,42,512,5245],
        judge: "Marcin",
        timeCreated: Date.now(),
        roomURL: 'lol',
        twitchURL: 'xD',
        mapsIdPlayed: [12313,234324,23453452345,15241]
    });
    ctx.body = allTournaments;
    next();
});

export = router.routes();



