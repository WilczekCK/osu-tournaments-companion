import Router from 'koa-router';
import koaBody from 'koa-body';
import auth from 'koa-basic-auth';
import osuApi from '../../../controllers/osuApi';
import users from '../../../controllers/users';
import * as credentials from '../../../../credentials.json';
const {protectedRoutes} = credentials;

const manageUser = new Router({
    prefix: '/m'
});

manageUser.all('/:id', auth({name:protectedRoutes.username, pass:protectedRoutes.password}), async (ctx, next) => {
    //before all, authorized routes!
    await next();
})

manageUser.post('/:id', async (ctx) => {
    const isUserInDB = await users.displayOne(ctx.params.id);
    if(isUserInDB.status === 200) return;

    const response = await users.insert(await osuApi(`users/${ctx.params.id}/osu`))

    ctx.status = response.status;
    ctx.body = response;
})

manageUser.patch('/:id', koaBody(), async (ctx) => {
    
    const {prefix, content} = ctx.request.body;
    const response = await users.update({
        whereQuery: {prefix: "id", content: ctx.params.id},
        modifyQuery: {prefix: prefix, content: content} 
    })

    ctx.body = response;
})


manageUser.delete('/:id', koaBody(), async (ctx) => {
    const response = await users.delete(ctx.params.id)
    
    ctx.body = response;
})

export = manageUser.routes();



