
import mongoose from "mongoose";
import tournamentsSchema from '../database/tournaments.schema';
/* const tournaments = {
    prepareRoom: _ => _,
    prepareUserInfo: _ => _,
    recognizeJudge: _ => _,
    sendToDb: _ => _,
    matchInfo: _ => _
} */

console.log(tournamentsSchema.Tournament)

export = tournamentsSchema;

/*   
    mongo.getConnection();
    const lol = new Tournament({id: 1, title:'Test', titleFlattened:'Tst', teams:[1,2,3,4,5], judge:"Boom", timeCreated:Date.now(), roomURL:"localhost", twitchURL:'osutv', mapsIdPlayed:[111,222,333]});
    lol.save();

    tournament.find((err: any, tournament: any) => {
        if(err) return console.log('err')
        console.log(tournament);
    })
    mongo.stopConnection();
 */