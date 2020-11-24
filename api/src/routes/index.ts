import Router from 'koa-router';
import tournamentsRoute from './tournaments/index';

import osuApi from '../controllers/osuApi';
import mongo from '../controllers/mongo';
import tournaments from '../controllers/tournaments';
import users from '../controllers/users';

const router = new Router();
router.use(tournamentsRoute)

router.get('/', async (ctx, next) => {
    const askedInfo = await osuApi('users/1837989');
    //const allTournaments:Object = await tournaments.displayCertain({title: "Test"});
    const user = await users.insert({
        id: askedInfo.id,
        username: askedInfo.username,
        country: askedInfo.country_code,
        playStyle: askedInfo.playstyle
    })

    console.log(user)
    
    /*const allTournaments = await tournaments.update({ 
            whereQuery: { prefix: "id", content: 1 },
            modifyQuery:{ prefix: "id", content: 123 } 
        });*/
    ctx.body = user;
    next();
});

export = router.routes();



