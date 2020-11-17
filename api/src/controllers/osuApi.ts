import * as credentials from '../../credentials.json';
const osuCreds = credentials.osuCreds;
class Auth{
    constructor(
        private clientId: number,
        private clientKey: string,
        private callbackUrl: string,
    ){
        console.log(this);
    }
}
class User{
    constructor(
        //... waiting for api config
    ){}
}
class Room{
    constructor(
        //... waiting for api config
    ){}
}
class Judge{
    constructor(
        //... waiting for api config
    ){}
}

const osuApi = {
    init: () => new Auth(osuCreds.clientId, osuCreds.clientKey, osuCreds.callbackUrl),
    //getUserInfo: (cb) => new User(),
    //getRoomInfo: (cb) => new Room(),
}

export = osuApi;