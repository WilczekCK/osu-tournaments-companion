import * as credentials from '../../credentials.json';
const osuCreds = credentials.osuCreds;

const osuApi = {
    init: _ => new Auth(osuCreds.clientId, osuCreds.clientKey, osuCreds.callbackUrl),
    getUserInfo: (cb) => new User(),
    getRoomInfo: (cb) => new Room(),
}

class Auth{
    constructor(
        private clientId: number,
        private clientKey: string,
        private callbackUrl: string,
    ){}
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

export = osuApi;