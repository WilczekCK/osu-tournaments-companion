import Router from 'koa-router';
import tournamentsRoute from './tournaments/index';

import osuApi from '../controllers/osuApi';
import mongo from '../controllers/mongo';
import tournaments from '../controllers/tournaments';


const router = new Router();
router.use(tournamentsRoute)

router.get('/', async (ctx, next) => {
    //const askedInfo = await osuApi('users/2415342');
    tournaments;
    ctx.body = 'lol';
    next();
});

export = router.routes();



