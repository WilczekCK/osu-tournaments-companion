import Router from 'koa-router';
const tournamentRouter = new Router({
    prefix: '/tournaments'
});
    
tournamentRouter.get('/', async (ctx) => {
    ctx.body = 'Tournament route';
})

export = tournamentRouter.routes();



