const mongo = {
    client: {},
    init: function() { this.client = new Auth('localhost', 'root', 'rootpass', 'osucompanion') },
    get: _ => _,
    insert: _ => _,
    delete: _ => _,
    modify: _ => _,
}

class Auth{
    constructor(
        private host: string,
        private user: string,
        private pass: string,
        private db: string,
        private port?: string
    ){}
}

export = mongo;