import Koa from 'koa';
import Logger from 'koa-logger';
import koaBody from 'koa-body';
import * as cron from 'node-cron';

import routes from './routes/index';

const app = new Koa();


app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      if(401 == err.status){
        ctx.status = 401;
        ctx.set('WWW-Authenticate', 'Basic');
        ctx.body = {status: ctx.status, response:"No access here!"}
      }else{
        throw err;
      }
      ctx.status = err.status || 500;
      ctx.body = {status: ctx.status, response:err.message}
    }
});


cron.schedule('* * * * *', () => {
  console.log('minute passed!');
})

app.use(routes);
app.use(Logger());
app.use(koaBody());

export = app;