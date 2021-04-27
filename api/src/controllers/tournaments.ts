
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
    
        const result = await tournamentsSchema.find((err: any, tournament: any) => {
            return tournament;
        });

        return result.length ? result : {status: 404, message: 'We do not have any tournament in DB yet :('};
    };

    public displayOne = async (tournamentId: Number) => {
        
        const result = await this.query( {id: tournamentId} ).find((err: any, tournament: any) => {
            return tournament;
        });

        return result.length ? result : {status: 404, message: 'We do not have this tournament at our DB :('};
    };

    public displayCertain = async (whereQuery: Object) => {
        
        const result = await this.query(whereQuery).find((err: any, tournament: any) => {
            return tournament;
        });

        return result;
    };

    public insert = async (match: tournamentsTypes.insertSchema['match'], events: Array<Object>, players: tournamentsTypes.insertSchema['players']) => {
        let [{judge}, {gameModes}, plays] = await this.parseEventsObject( events );

        // In plays.beatmap players have the team color!
        let sortedTeams = await this.sortTeams( plays.beatmap );

        const newTournament = new tournamentsSchema({
            id: match.id,
            title: match.name,
            titleFlattened: match.name, //to flatten soon
            teams: {
                blue: sortedTeams.blue,
                red: sortedTeams.red,
                names: this.getTeamsName(match.name)
            }, 
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

        return {status: 200}
    };

    public delete = async (tournamentId: Number) => {
        const {ok, deletedCount} = await tournamentsSchema.deleteOne({id: tournamentId}, (cb) => cb);

        const status = ok ? 200 : 400;
        return {status, deletedCount};
    }

    public update = async (tournamentInfo: tournamentsTypes.updateSchema ) => {
        const {whereQuery, modifyQuery} = tournamentInfo;

        const resp = modifyQuery.content && modifyQuery.prefix 
        ? await tournamentsSchema.updateOne(
            {[whereQuery.prefix]: whereQuery.content}, 
            {[modifyQuery.prefix]: modifyQuery.content})
        : {ok: 0};        

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

                    gameDetails['info'] = {...gameDetails['info'] }

                    playedBeatmaps.beatmap.push({
                        info:       gameDetails['info'],
                        scores:     gameDetails['scores'],
                        mods:       gameDetails['mods'],
                        summaryScore: this.getSummaryScore( gameDetails['scores'] )
                    })
                    
                    countModes[game.mode]++;
                    break;
            }

        }

        getInfo.push( {'gameModes': countModes} );
        getInfo.push(playedBeatmaps);
        return getInfo;
    }

    public sortTeams = async ( beatmapsPlayed: any ) => {    
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

    public getSummaryScore = (beatmapPlayed: any) => {
        let sortedScores: { blue: number, red: number } = {
            blue: 0,
            red: 0,
        }

        for(let score of beatmapPlayed){
            if(score.match.team === 'blue'){
                sortedScores['blue'] += score.score;
            }else if(score.match.team === 'red'){
                sortedScores['red'] += score.score;
            }
        }

        return sortedScores;
    }

    public getTeamsName = (tournamentName: string) => {
        let flags = { isColonNoticed: false, isBracketOpen: false, firstTeamGot: false }
        let teamsName: { blue: string, red: string } = {
            blue: '',
            red: ''
        }

        for(let letter of tournamentName){

            switch(true) {
                case (':' === letter):
                    flags.isColonNoticed = true;
                    break;
                case ('(' === letter && flags.isColonNoticed):
                    flags.isBracketOpen = true;
                    break;
                case (')' === letter && flags.isBracketOpen):
                    flags.firstTeamGot = true;
                    flags.isBracketOpen = false;
                    break;
                case ('(' === letter && flags.firstTeamGot):
                    flags.isBracketOpen = true;
                default:
                    if(flags.isColonNoticed && flags.isBracketOpen && !flags.firstTeamGot) teamsName.blue += letter;
                    if(flags.isColonNoticed && flags.isBracketOpen && flags.firstTeamGot) teamsName.red += letter;
                    break;
            }

        }

        return teamsName;
    }
}

export = new Tournaments();