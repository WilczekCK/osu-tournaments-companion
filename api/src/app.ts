import Koa from 'koa';
import Router from 'koa-router';
import Logger from 'koa-logger';

const app = new Koa();
const router = new Router();

router.get('/', async (ctx) => {
    ctx.body = 'Hello World!';
});

router.get('/osuApi', async (ctx) => {
    ctx.status = 200;
});


app.use(router.routes());
app.use(Logger());

export = app;