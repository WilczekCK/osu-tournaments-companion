import Koa from 'koa';
import Logger from 'koa-logger';
import koaBody from 'koa-body';
import cors from '@koa/cors';

import routes from './routes/index';
import cronEvents from './controllers/cron';
import mongo from './controllers/mongo';

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

// Front-end, allows CORS
app.use(cors({
  allowMethods: 'GET',
  origin: 'http://localhost:8080'
}));

app.use(routes);
app.use(Logger());
app.use(koaBody());

//Start mongo connection!
mongo.getConnection();

//Refresh the informations about 
cronEvents.start();

export = app;