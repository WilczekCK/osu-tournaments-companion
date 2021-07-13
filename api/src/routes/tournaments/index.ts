import Router from 'koa-router';
import osuApi from '../../controllers/osuApi';
import tournaments from '../../controllers/tournaments';
import manageTournament from './manage/index';

const tournamentRouter = new Router({
    prefix: '/tournaments'
});

tournamentRouter.use(manageTournament);
    
tournamentRouter.get('/', async (ctx) => {
    let {osuApi: extApi, limit = 0, startFrom = 0, queryKey = '', queryValue='', cursorMatchId=0} = ctx.query;

    //show osuApi, where it should start scraping tournaments
    let cursorMatchQuery = '';
    if (cursorMatchId != 0) {
        cursorMatchQuery = `cursor[match_id]=${cursorMatchId}`
    }

    ctx.body = extApi 
        ? await osuApi(`matches?${cursorMatchQuery}`) 
        : limit === 0 ? await tournaments.displayAll() : await tournaments.displaySome(queryKey, queryValue, startFrom, limit);
})

tournamentRouter.get('/countTournaments', async (ctx) => {
    let {queryKey = '', queryValue=''} = ctx.query;

    ctx.body = await tournaments.countTournaments(queryKey, queryValue);
})

// Just for displaying single tournament
tournamentRouter.get('/:id', async (ctx) => {
    let {osuApi: extApi} = ctx.query;

    ctx.body = extApi 
        ? await osuApi(`matches/${ctx.params.id}`) 
        : await tournaments.displayOne(ctx.params.id)

    
})

export = tournamentRouter.routes();



