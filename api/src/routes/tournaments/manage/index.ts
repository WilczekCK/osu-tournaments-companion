import Router from 'koa-router';
const manageTournament = new Router({
    prefix: '/m'
});
    
manageTournament.get('/:id', async (ctx) => {
    ctx.body = {id: ctx.params.id};
})

export = manageTournament.routes();