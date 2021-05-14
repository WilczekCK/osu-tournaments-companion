import Router from 'koa-router';
import osuApi from '../../controllers/osuApi';
import tournaments from '../../controllers/tournaments';
import manageTournament from './manage/index';

const tournamentRouter = new Router({
    prefix: '/tournaments'
});

tournamentRouter.use(manageTournament);
    
tournamentRouter.get('/', async (ctx) => {
    let {osuApi: extApi, limit = 0, startFrom = 0, queryKey = '', queryValue=''} = ctx.query;

    ctx.body = extApi 
        ? await osuApi(`matches/`) 
        : limit === 0 ? await tournaments.displayAll() : await tournaments.displaySome(queryKey, queryValue, startFrom, limit);
})

tournamentRouter.get('/countTournaments', async (ctx) => {
    let {queryKey = '', queryValue=''} = ctx.query;
    ctx.body = queryKey && queryValue 
        ? await tournaments.countTournaments({})
        : await tournaments.countTournaments({queryKey, queryValue});
})

// Just for displaying single tournament
tournamentRouter.get('/:id', async (ctx) => {
    let {osuApi: extApi} = ctx.query;

    ctx.body = extApi 
        ? await osuApi(`matches/${ctx.params.id}`) 
        : await tournaments.displayOne(ctx.params.id)

    
})

export = tournamentRouter.routes();



