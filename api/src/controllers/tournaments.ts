
import mongo from "./mongo";
import tournamentsSchema from '../database/tournaments.schema';
import * as tournamentsTypes from '../validators/tournamentTypes';
import tournaments from "../routes/tournaments";
import users from "./users";
import osuApi from "./osuApi";
import axios from 'axios';
import {protectedRoutes} from '../../credentials.json';
import { object } from "underscore";
import { match } from "assert";


class Tournaments {
    private connect = () => mongo.getConnection();
    private disconnect = () => mongo.stopConnection();
    //@ts-ignore
    private query = (where: string | number | object) => tournamentsSchema.where(where);
    public regex = /(\w*[a-zA-Z]): \(([^)]+)\) ((vs)|(VS)) \(([^)]+)\)/;
    
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

    public insert = async (match: tournamentsTypes.insertSchema['match'], events: Array<Object>, players: tournamentsTypes.insertSchema['players']) => {
        this.connect()
        let [{judge}, {gameModes} , plays] = await this.parseEventsObject( events );

        // In plays.beatmap players have the team color!
        let sortedTeams = await this.sortTeams( plays.beatmap );

        const newTournament = new tournamentsSchema({
            id: match.id,
            title: match.name,
            titleFlattened: match.name, //to flatten soon
            teams: sortedTeams, //to divide later === (n-1) /2
            users: players,
            judge: judge,
            timeCreated: match.start_time,
            timeEnded: match.end_time,
            twitchURL: 'TBA',
            mapsPlayed: plays.beatmap,
            gameModes,
            events
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

    public update = async (tournamentInfo: tournamentsTypes.updateSchema ) => {
        this.connect()

        const {whereQuery, modifyQuery} = tournamentInfo;

        const resp = modifyQuery.content && modifyQuery.prefix 
        ? await tournamentsSchema.updateOne(
            {[whereQuery.prefix]: whereQuery.content}, 
            {[modifyQuery.prefix]: modifyQuery.content})
        : {ok: 0};        

        console.log(resp);

        const status = resp.ok ? {status:200, message:'Modified info, OK!'} : {status:400, message:"Missing/Issued data or not found user with that ID"};
        
        return {status};
    }

    public parseEventsObject = async (eventsDetail: object[] ) => {
        let getInfo : {[key: string] : number | string | object | object[]}[] = [];
        let playedBeatmaps: {[key: string]: Array<object>} = { beatmap:[] }
        let countModes: {[key:string]: number} = {osu: 0, mania:0, ctb:0, taiko:0};
        for await(let event of eventsDetail){
            const {detail, game, user_id} : tournamentsTypes.roomInfo = event;
            const eventTriggered : tournamentsTypes.eventDetail = { id: detail.id, type: detail.type, user_id };

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
                    const isUserInDB = await users.displayOne(user_id);
                    if(isUserInDB.status !== 200){
                        await users.insert(await osuApi(`users/${user_id}/osu`))
                    }

                    break;
                case 'player-left':
                    break;
                case 'other':
                    const gameDetails : tournamentsTypes.gameDetail = {mods: game.mods, info: game.beatmap, scores: game.scores}
                    playedBeatmaps.beatmap.push({
                        info:       gameDetails['info'],
                        scores:     gameDetails['scores'],
                        mods:       gameDetails['mods']
                    })

                    
                    countModes[game.mode]++;
                    break;
            }

        }

        getInfo.push( {'gameModes': countModes} );
        getInfo.push(playedBeatmaps);
        return getInfo;
    }

    public sortTeams = async ( beatmapsPlayed: any) => {    
        let sortedTeams: { blue: Array<number>, red: Array<number> } = {
            blue: [],
            red: []
        }

        for(let beatmap of beatmapsPlayed){
            for(let score of beatmap.scores){
                if(score.match.team === 'blue' && !sortedTeams['blue'].includes(score.user_id)){
                    sortedTeams['blue'].push(score.user_id);
                }else if(score.match.team === 'red' && !sortedTeams['red'].includes(score.user_id)){
                    sortedTeams['red'].push(score.user_id);
                }
            }
        }

        return sortedTeams;
    }
}

export = new Tournaments();