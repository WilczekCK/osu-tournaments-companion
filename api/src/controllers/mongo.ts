import * as credentials from '../../credentials.json';
import mongoose, { Schema } from "mongoose";
const {mongoCreds} = credentials;


class Mongo{
    private uri: string = `${mongoCreds.prefix + mongoCreds.host}:${mongoCreds.port}/${mongoCreds.database}`;
    public getConnection(){
        return mongoose.connect(this.uri, 
            {useUnifiedTopology: true, useNewUrlParser: true},
            (err: any) => {
                if(err){
                    return false;
                }

                return true;
        })
    };  
}

class Query extends Mongo {
    public queryResult: Promise<string>;
    public getStatus: Promise<number>;
    public connection: string;

    public constructor (getConnection: string){
       super();
    }
}


const mongo = new Mongo();
mongo.getConnection();

const tournamentSchema = new Schema({
    id: Number,
    title: String,
    titleFlattened: String,
    teams: Array,
    judge: String,
    timeCreated: Date,
    roomURL: String,
    twitchURL: String,
    mapsIdPlayed: Array,
})

const Tournament = mongoose.model('Tournament', tournamentSchema);
const lol = new Tournament({id: 1, title:'Test', titleFlattened:'Tst', teams:[1,2,3,4,5], judge:"Boom", timeCreated:Date.now(), roomURL:"localhost", twitchURL:'osutv', mapsIdPlayed:[111,222,333]});
lol.save();

export = Query;