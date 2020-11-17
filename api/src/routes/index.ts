import Router from 'koa-router';
import tournamentsRoute from './tournaments/index';

import osuApi from '../controllers/osuApi';

const router = new Router();
router.use(tournamentsRoute)

router.get('/', async (ctx) => {
    osuApi.init();
    ctx.body = 'Hello World!';
});

export = router.routes();



