import * as credentials from '../../credentials.json';
const {mongoCreds} = credentials;

class Mongo{
    public getConnection : string;

    public constructor (query: string){
        this.getConnection = 'connected';
    }
}

class Query extends Mongo {
    public queryResult: Promise<string>;
    public getStatus: Promise<number>;
    public connection: string;

    public constructor (getConnection: string){
       super(getConnection);
    }
}

const lel = new Query('test')
console.log(lel)

export = Query;