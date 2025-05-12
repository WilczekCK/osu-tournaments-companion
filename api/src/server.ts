import Koa from 'koa';
import Logger from 'koa-logger';
import koaBody from 'koa-body';
import cors from '@koa/cors';

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

// Front-end, allows CORS
const allowedOrigins = [
  'https://otc.glad.vision',
  'http://localhost',
  'http://localhost:5173',
];

app.use(cors({
  origin: (ctx) => {
    const requestOrigin = ctx.headers.origin;
    if (!requestOrigin) return false;
    if (allowedOrigins.includes(requestOrigin)) {
      return requestOrigin;
    }
    return false;
  },
  allowMethods: ['GET'], // ✅ właściwa opcja w @koa/cors
}));


app.use(routes);
app.use(Logger());
app.use(koaBody());

export = app;