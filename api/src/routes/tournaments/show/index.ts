import Router from 'koa-router';
const showTournament = new Router();
    
showTournament.get('/:id', async (ctx) => {
    ctx.body = {id: ctx.params.id};
})

export = showTournament.routes();