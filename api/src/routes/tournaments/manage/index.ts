import Router from 'koa-router';
import koaBody from 'koa-body';
import auth from 'koa-basic-auth';
import osuApi from '../../../controllers/osuApi';
import tournaments from '../../../controllers/tournaments';
import users from '../../../controllers/users';
import * as credentials from '../../../../credentials.json';
const {protectedRoutes} = credentials;

const manageTournament = new Router({
    prefix: '/m'
});

console.log(protectedRoutes)
manageTournament.all('/:id', auth({name:protectedRoutes.username, pass:protectedRoutes.password}), async (ctx, next) => {
    //before all, authorized routes!
    await next();
})
    
manageTournament.post('/:id', async (ctx) => {
    const {match, events, users: players} = await osuApi(`matches/${ctx.params.id}`);

    const response = await tournaments.insert({
        id: match.id,
        title: match.name,
        titleFlattened: match.name, //to flatten soon
        //teams: recent_participants, //to divide later === (n-1) /2
        users: players,
        //judge: user_id,
        timeCreated: match.start_time,
        timeEnded: match.end_time,
        //roomURL: channel_id,
        twitchURL: 'TBA',
        //mapsIdPlayed: playlist,
        //isActive: active,
        events
    })

    ctx.status = response.status;
    ctx.body = response;
})

manageTournament.patch('/:id', koaBody(), async (ctx) => {
    const {prefix, content} = ctx.request.header;

    const response = await tournaments.update({
        whereQuery: {prefix: "id", content: ctx.params.id},
        modifyQuery: {prefix: prefix, content: content} 
    })

    ctx.body = response;
})


manageTournament.delete('/:id', koaBody(), async (ctx) => {
    const response = await tournaments.delete(ctx.params.id)
    
    ctx.body = response;
})



export = manageTournament.routes();



