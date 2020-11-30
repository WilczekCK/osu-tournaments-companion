import Router from 'koa-router';
import manageUser from './manage/index';

const userRouter = new Router({
    prefix: '/users'
});

userRouter.use(manageUser);
    
userRouter.get('/', async (ctx) => {
    ctx.body = 'All of the users will be listed here!';
})

export = userRouter.routes();



