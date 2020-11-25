import Router from 'koa-router';
import osuApi from '../../../controllers/osuApi';
const showTournament = new Router();

showTournament.get('/', async (ctx) => {
    ctx.body = 'When ppy will give access to route, it will be available';
})
// Just for displaying single tournament
showTournament.get('/:id', async (ctx) => {
    ctx.body = await osuApi(`rooms/${ctx.params.id}`);
})

export = showTournament.routes();