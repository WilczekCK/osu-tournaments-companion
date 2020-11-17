import * as credentials from '../../credentials.json';
import axios from 'axios';

const {osuCreds} = credentials;
class OsuApi{
    public token: Promise<string>;

    public constructor (){
        this.token = getToken();
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
        .catch(function (error) {
            console.log(error);
        })    
}

export = new OsuApi();