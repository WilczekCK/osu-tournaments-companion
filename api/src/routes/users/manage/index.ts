import Router from 'koa-router';
import koaBody from 'koa-body';
import osuApi from '../../../controllers/osuApi';
import users from '../../../controllers/users';

const manageUser = new Router({
    prefix: '/m'
});

manageUser.post('/:id', async (ctx) => {
    const {id, username, country, playstyle} = await osuApi(`users/${ctx.params.id}/osu`)

    const response = await users.insert({
        id,
        username,
        country: country.code,
        playStyle: playstyle
    })

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



