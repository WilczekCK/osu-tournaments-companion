import * as credentials from '../../credentials.json';
const {mongoCreds} = credentials;

class Mongo{
    public queryResult: Promise<string>;
    public getStatus: Promise<number>;

    public constructor (query: string){
        //this.queryResult 
    }
}

export = Mongo;