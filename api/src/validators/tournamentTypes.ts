type updateSchema = {
    whereQuery: {
        [key: string]: string | number,
    },
    modifyQuery: {
        [key: string]: any
    },
}

type insertSchema = {
    match: {
        id: number,
        name: string,
        start_time: Date,
        end_time: Date
    },
    players: Array<object>,
    events: {
        id: number,
        detail: object,
        user_id: number,
    }
}

type roomInfo = {
    detail?: any,
    game?: any,
    user_id?: number,
    match?: any,
    plays?: any,
    users?: any,
}

type eventDetail = {
    id: number,
    type: string,
    user_id: number | Number,
}

type gameDetail = {
    mods?: Array<object> | string, //still not quite sure
    info: Array<object>,
    scores: Array<object>
}

export {
    updateSchema,
    insertSchema,
    roomInfo,
    eventDetail,
    gameDetail
}