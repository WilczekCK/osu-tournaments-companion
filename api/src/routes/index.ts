import Router from 'koa-router';
import tournamentsRoute from './tournaments/index';

import osuApi from '../controllers/osuApi';

const router = new Router();
router.use(tournamentsRoute)

router.get('/', async (ctx, next) => {
    const askedInfo = await osuApi('users/2427116');

    ctx.body = askedInfo;
    next();
});

export = router.routes();



