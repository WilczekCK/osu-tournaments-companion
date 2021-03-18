import Router from 'koa-router';
import osuApi from '../../controllers/osuApi';
import manageTournament from './manage/index';

const tournamentRouter = new Router({
    prefix: '/tournaments'
});

tournamentRouter.use(manageTournament);
    
tournamentRouter.get('/', async (ctx) => {
    ctx.body = await osuApi(`matches/`);
})

// Just for displaying single tournament
tournamentRouter.get('/:id', async (ctx) => {
    let {osuApi: extApi} = ctx.query;

    ctx.body = extApi 
        ? await osuApi(`matches/${ctx.params.id}`) 
        : {status: 200}
})

export = tournamentRouter.routes();



