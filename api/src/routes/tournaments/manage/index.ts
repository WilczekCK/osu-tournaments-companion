import Router from 'koa-router';
import osuApi from '../../../controllers/osuApi';
import tournaments from '../../../controllers/tournaments';

const manageTournament = new Router({
    prefix: '/m'
});
    
manageTournament.post('/:id', async (ctx) => {
    const {id, name, user_id, starts_at, playlist, recent_participants, channel_id, active} = await osuApi(`rooms/${ctx.params.id}`)
    const response = await tournaments.insert({
        id,
        title: name,
        titleFlattened: name, //to flatten soon
        teams: recent_participants,
        judge: user_id,
        timeCreated: starts_at,
        roomURL: channel_id,
        twitchURL: 'TBA',
        mapsIdPlayed: playlist,
        isActive: active
    })

    ctx.body = response;
})



export = manageTournament.routes();



