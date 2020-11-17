import Router from 'koa-router';
import showTournament from './show/index';
import manageTournament from './manage/index';

const tournamentRouter = new Router({
    prefix: '/tournaments'
});

tournamentRouter.use(showTournament, manageTournament);
    
tournamentRouter.get('/', async (ctx) => {
    ctx.body = 'Tournament route';
})

export = tournamentRouter.routes();



