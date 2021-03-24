
import mongo from "./mongo";
import tournamentsSchema from '../database/tournaments.schema';
import tournaments from "../routes/tournaments";
import users from "../routes/users";
import axios from 'axios';

type UpdateSchema = {
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

class Tournaments {
    private connect = () => mongo.getConnection();
    private disconnect = () => mongo.stopConnection();
    //@ts-ignore
    private query = (where: string | number | object) => tournamentsSchema.where(where);

    public displayAll = async () => {
        this.connect();
        
        const result = await tournamentsSchema.find((err: any, tournament: any) => {
            return tournament;
        });

        this.disconnect();
        return result.length ? result : {status: 404, message: 'We do not have any tournament in DB yet :('};
    };

    public displayOne = async (tournamentId: Number) => {
        this.connect();
        
        const result = await this.query( {id: tournamentId} ).find((err: any, tournament: any) => {
            return tournament;
        });

        this.disconnect();
        return result.length ? result : {status: 404, message: 'We do not have this tournament at our DB :('};
    };

    public displayCertain = async (whereQuery: Object) => {
        this.connect();
        
        const result = await this.query(whereQuery).find((err: any, tournament: any) => {
            return tournament;
        });

        this.disconnect();
        return result;
    };

    public insert = async (match: insertSchema['match'], events: Array<Object>, players: insertSchema['players']) => {
        this.connect()
        let [{judge}, plays] = await this.parseEventsObject( events );

        const newTournament = new tournamentsSchema({
            id: match.id,
            title: match.name,
            titleFlattened: match.name, //to flatten soon
            //teams: recent_participants, //to divide later === (n-1) /2
            users: players,
            judge: judge,
            timeCreated: match.start_time,
            timeEnded: match.end_time,
            twitchURL: 'TBA',
            mapsPlayed: plays.beatmap
        });
        
        try{
            await newTournament.save();
        }catch(err){
            return {status : 422, response: "This tournament is already listed or some data is missing"};
        }

        this.disconnect();

        return {status: 200}
    };

    public delete = async (tournamentId: Number) => {
        this.connect()

        const {ok, deletedCount} = await tournamentsSchema.deleteOne({id: tournamentId}, (cb) => cb);
        
        this.disconnect();

        const status = ok ? 200 : 400;
        return {status, deletedCount};
    }

    public update = async (tournamentInfo: UpdateSchema ) => {
        this.connect()

        const {whereQuery, modifyQuery} = tournamentInfo;
        const resp = modifyQuery.content && modifyQuery.prefix 
        ? await tournamentsSchema.updateOne(
            {[whereQuery.prefix]: whereQuery.content}, 
            {[modifyQuery.prefix]: modifyQuery.content})
        : {ok: 0};

        this.disconnect()

        const status = resp.ok ? {status:200, message:'Modified info, OK!'} : {status:400, message:"Missing/Issued data or not found user with that ID"};
        return {status};
    }

    public parseEventsObject = async (eventsDetail: object[] ) => {
        let getInfo : {[key: string] : number | string | object | object[]}[] = [];
        let playedBeatmaps: {[key: string]: Array<object>} = { beatmap:[] };

        type roomInfo = {
            detail?: any,
            game?: any,
            user_id?: number
        }

        interface eventDetail {
            id: number,
            type: string,
            user_id: number | Number,
        }

        interface gameDetail {
            mods?: Array<object> | string, //still not quite sure
            info: Array<object>,
            scores: Array<object>
        }

        for await(let event of eventsDetail){
            const {detail, game, user_id} : roomInfo = event;
            const eventTriggered : eventDetail = { id: detail.id, type: detail.type, user_id };

            //maybe later it will be useful.
            switch( eventTriggered.type ){
                case 'match-created':
                    getInfo.push( {'judge': eventTriggered.user_id } );
                    break;
                case 'match-disbanded':
                    break;
                case 'host-changed':
                    break;
                case 'player-joined':
                    break;
                case 'player-left':
                    break;
                case 'other':
                    const gameDetails : gameDetail = {mods: game.mods, info: game.beatmap, scores: game.scores}
                    playedBeatmaps.beatmap.push({
                        info:       gameDetails['info'],
                        scores:     gameDetails['scores'],
                        mods:       gameDetails['mods']
                    })
                    break;
            }

        }

        getInfo.push(playedBeatmaps);
        return getInfo;
    }
}

export = new Tournaments();