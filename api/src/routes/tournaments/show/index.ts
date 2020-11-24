import Router from 'koa-router';
import osuApi from '../../../controllers/osuApi';
const showTournament = new Router();
    
// Just for displaying single tournament
showTournament.get('/:id', async (ctx) => {
    ctx.body = await osuApi(`rooms/${ctx.params.id}`);
})

export = showTournament.routes();