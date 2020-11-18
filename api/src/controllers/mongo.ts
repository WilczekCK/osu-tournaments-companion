import * as credentials from '../../credentials.json';
import mongoose from "mongoose";
const {mongoCreds} = credentials;


class Mongo{
    private uri: string = `${mongoCreds.prefix + mongoCreds.host}:${mongoCreds.port}/${mongoCreds.database}`;
    public getConnection(){
        return mongoose.connect(this.uri, 
            {useUnifiedTopology: true, useNewUrlParser: true},
            (err: any) => {
                if(err){
                    console.log(err.message);
                }else{
                    console.log('connected! :)')
                }
        })
    }    
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

export = Query;