import Router from 'koa-router';
import manageUser from './manage/index';
import user from '../../controllers/users';
import osuApi from '../../controllers/osuApi';

const userRouter = new Router({
    prefix: '/users'
});

userRouter.use(manageUser);
    
userRouter.get('/', async (ctx) => {
    ctx.body = 'All of the users will be listed here!';
})

userRouter.get('/:id', async (ctx) => {
    let {osuApi: extApi} = ctx.query;

    ctx.body = extApi 
        ? await osuApi(`users/${ctx.params.id}`)
        : await user.displayOne(ctx.params.id) 
})



export = userRouter.routes();



