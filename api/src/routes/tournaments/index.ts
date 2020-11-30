import Router from 'koa-router';
import osuApi from '../../controllers/osuApi';
import manageTournament from './manage/index';

const tournamentRouter = new Router({
    prefix: '/tournaments'
});

tournamentRouter.use(manageTournament);
    
tournamentRouter.get('/', async (ctx) => {
    ctx.body = 'When ppy will give access to route, it will be available';
})
// Just for displaying single tournament
tournamentRouter.get('/:id', async (ctx) => {
    ctx.body = await osuApi(`rooms/${ctx.params.id}`);
})

export = tournamentRouter.routes();



