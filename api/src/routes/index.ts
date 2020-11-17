import Router from 'koa-router';
import tournamentsRoute from './tournaments/index';


const router = new Router();
router.use(tournamentsRoute)

router.get('/', async (ctx) => {
    ctx.body = 'Hello World!';
});

export = router.routes();



