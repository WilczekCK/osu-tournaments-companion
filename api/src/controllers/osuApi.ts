import { osuCreds } from '../../credentials.json';


const osuApi = {
    init: _ => new Auth(12345, 'test', 'localhost:3000'),
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