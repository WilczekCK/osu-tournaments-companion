import * as credentials from '../../credentials.json';
import axios from 'axios';
class OsuApi{
    public constructor (osuCreds: any){
        this.getToken(osuCreds);
    }

    public async getToken(osuCreds: any){
        return await axios.post( osuCreds.getTokenUrl, {
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
}

new OsuApi(credentials.osuCreds);

export = OsuApi;