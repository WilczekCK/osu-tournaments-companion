import Koa from 'koa';
import Router from 'koa-router';
import Logger from 'koa-logger';

const app = new Koa();
const router = new Router();

router.get('/', async (ctx) => {
    ctx.body = 'Hello World!';
});

app.use(router.routes());
app.use(Logger());

export = app;