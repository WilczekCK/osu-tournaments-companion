import * as credentials from '../../credentials.json';
import axios from 'axios';

const {osuCreds} = credentials;
class OsuApi{
    public token: Promise<string>;
    public getInfo: any; 

    public constructor (scope: string){
        this.token = getToken();
        this.getInfo = accessApi(scope);
    }
}

async function getToken(){
    return await axios
        .post( osuCreds.getTokenUrl, {
            client_id: osuCreds.clientId,
            client_secret: osuCreds.clientKey,
            grant_type: 'client_credentials',
            scope: 'public',
        })
        .then(function ( {data} ) {
            return data.access_token;
        })
        .catch(function (error: never) {
            throw new Error(`Problem with gaining token from Osu!Api, ${error}`)
        })    
}

async function accessApi(scope: string){
    return await axios({
        method: 'get',
        url: osuCreds.apiEndpoint+scope,
        headers: { Authorization: `Bearer ${await getToken()}` }
    })
    .then(function ( {data} ) {
        return data;
    })
    .catch(function (error: never) {
        throw new Error(`Could not connect to Osu!Api, ${error}`)
    })    
}

export = (scope: string) => new OsuApi(scope).getInfo;