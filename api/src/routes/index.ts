import Router from 'koa-router';
import tournamentsRoute from './tournaments/index';
import tournament from '../database/tournaments.schema';

import osuApi from '../controllers/osuApi';
import mongo from '../controllers/mongo';

const router = new Router();
router.use(tournamentsRoute)

router.get('/', async (ctx, next) => {
    //const askedInfo = await osuApi('users/2415342');
    mongo.getConnection();
    tournament.find((err: any, tournament: any) => {
        if(err) return console.log('err')
        console.log(tournament);
    })

    ctx.body = 'lol';
    next();
});

export = router.routes();



