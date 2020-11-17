import Koa from 'koa';
import Logger from 'koa-logger';

import routes from './routes/index';

const app = new Koa();

app.use(routes);
app.use(Logger());

export = app;