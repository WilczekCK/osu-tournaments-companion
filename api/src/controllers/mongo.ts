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
                    throw new Error(`Something went wrong while trying to connect to DB, ${err}`);
                }

                return true;
        })
    };
    
    public stopConnection(){
        return mongoose.disconnect( (err: any) => {
            if(err){
                throw new Error(`Something went wrong while trying to disconnect from DB, ${err}`);
            }

            return true;
        });
    };
}


var mongo = new Mongo();
export = mongo;