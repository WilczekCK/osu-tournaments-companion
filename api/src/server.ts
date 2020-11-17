import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as Logger from 'koa-logger';

const app = new Koa();
const router = new Router();

router.get('(./)', async (ctx) => {
    ctx.body = 'Hello World!';
});

app.use(router.routes());
app.use(Logger());

app.listen(3000);

console.log('Server running on port 3000');