import Router from 'koa-router';
import tournamentsRoute from './tournaments/index';

import osuApi from '../controllers/osuApi';
import mongo from '../controllers/mongo';
import tournaments from '../controllers/tournaments';


const router = new Router();
router.use(tournamentsRoute)

router.get('/', async (ctx, next) => {
    const askedInfo = await osuApi('users/1837989');
    //const allTournaments:Object = await tournaments.displayCertain({title: "Test"});

    
    /*const allTournaments = await tournaments.update({ 
            whereQuery: { prefix: "id", content: 1 },
            modifyQuery:{ prefix: "id", content: 123 } 
        });*/
    ctx.body = askedInfo;
    next();
});

export = router.routes();



