import Router from 'koa-router';
import tournamentsRoute from './tournaments/index';
import usersRoute from './users/index';

import osuApi from '../controllers/osuApi';
import mongo from '../controllers/mongo';
import tournaments from '../controllers/tournaments';
import users from '../controllers/users';

const router = new Router();
router.use(tournamentsRoute, usersRoute)

router.get('/', async (ctx, next) => {
    const askedInfo = await osuApi('rooms/405854465');
    //const allTournaments:Object = await tournaments.displayCertain({title: "Test"});
   
    /*const allTournaments = await tournaments.update({ 
            whereQuery: { prefix: "id", content: 1 },
            modifyQuery:{ prefix: "id", content: 123 } 
        });*/
    ctx.body = askedInfo;
    next();
});

export = router.routes();



