import Koa from 'koa';
import Logger from 'koa-logger';

import routes from './routes/index';

const app = new Koa();


app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = {status: ctx.status, response:err.message}
    }
});


app.use(routes);
app.use(Logger());

export = app;