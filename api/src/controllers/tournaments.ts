
import tournamentsSchema from '../database/tournaments.schema';
import * as tournamentsTypes from '../validators/tournamentTypes';
import users from "./users";
import _ from "underscore";
import { StdioNull } from 'child_process';


class Tournaments {
    //@ts-ignore
    private query = (where: string | number | object) => tournamentsSchema.where(where);
    public regex = /(\w*[\w!();:@$]): \((.*?)\) ((vs)|(VS)) \((.*?)\)/;
    
    //check by the name, tournaments have the same structures
    public isTournament = (tournamentName:string) :boolean => this.regex.test(tournamentName);
    
    public displayAll = async () => {
    
        const result = await tournamentsSchema.find((err: any, tournament: any) => {
            return tournament;
        }).sort({timeCreated: -1});

        return result.length ? result : {status: 404, message: 'We do not have any tournament in DB yet :('};
    };

    public displayOne = async (tournamentId: Number) => {
        
        const result = await this.query( {id: tournamentId} ).find((err: any, tournament: any) => {
            return tournament;
        });

        return result.length ? result : {status: 404, message: 'We do not have this tournament at our DB :('};
    };

    public displaySome = async (queryKey:string, queryValue:string, startFrom: string, limitedTo:string) => {
        
        const query:object = queryKey && queryValue ? { [`${queryKey}`]: { $regex: new RegExp(queryValue, 'i')} } : {};

        const result = await this.query( query ).find((err: any, tournament: any) => {
            return tournament;
        }).sort({timeCreated: -1}).skip( parseInt(startFrom) ).limit( parseInt(limitedTo) );

        return result.length ? result : {status: 404, message: 'We do not have this tournament at our DB :('};
    };

    public displayCertain = async (whereQuery: Object) => {
        
        const result = await this.query(whereQuery).find((err: any, tournament: any) => {
            return tournament;
        }).sort({timeCreated: -1});

        return result;
    };

    public countTournaments = async (queryKey:string, queryValue:string) => {

        const query:object = queryKey && queryValue ? { [`${queryKey}`]: { $regex: new RegExp(queryValue, 'i')} } : {};
        
        const result = await this.query(query).find((err: any, tournament: any) => {
            return tournament;
        }).count();

        return result;
    };

    public isWhitelisted = (tournamentNameFlatten: string) => {
        const blackList:Array<string> = [
            'o!mm', 'o!mm Ranked', 'o!mm Private', 'o!mm Team Private', 'o!mm Team Ranked' //o!mm related, waiting for API access from developer
        ];

        if ( _.contains(blackList, tournamentNameFlatten) ){
            return false;
        }

        return true;
    }

    public areQualifiers = (nameA: string, nameB: string, tournamentNameFlatten: string) => {
        const qualifiers:Array<string> = [
            'Qualifiers', 'Tryouts'
        ];

        const isTestPassed = _.filter(qualifiers, function(item) {
            if( item === nameA || item === nameB || !_.isEmpty(tournamentNameFlatten.match(/qualifiers/gi)) || !_.isEmpty(tournamentNameFlatten.match(/tryouts/gi)) ) {
                return true
            }else{
                return false;
            };
        })

        return !_.isEmpty(isTestPassed);
    }

    public insert = async (match: tournamentsTypes.insertSchema['match'], events: Array<Object>, players: tournamentsTypes.insertSchema['players']) => {
        //scrap the name of tournament for identification of tournament
        const {teamsName, tournamentNameFlatten} = this.getTeamsName(match.name);
        
        //is tournament a qualifier?
        let areQualifiers = this.areQualifiers(teamsName.blue, teamsName.red, tournamentNameFlatten);
        
        //prepare informations about the tournament
        let [{judge}, {gameMode}, {playedBeatmaps}] = await this.parseEventsObject( events, areQualifiers );
    
        // In plays.beatmap players have the team color!
        let sortedTeams = await this.sortTeams( playedBeatmaps, judge );

        // Judge first!
        await users.insert(judge);

        //WHITELIST!
        if ( !this.isWhitelisted(tournamentNameFlatten) ) {
            return {status: 400, repsonse: "This tournament type is disallowed!"};
        }

        const newTournament = new tournamentsSchema({
            id: match.id,
            title: match.name,
            titleFlattened: tournamentNameFlatten, //to flatten soon
            teams: {
                blue: sortedTeams.blue,
                red: sortedTeams.red,
                names: teamsName,
            }, 
            users: players,
            judge: judge,
            timeCreated: match.start_time,
            timeEnded: match.end_time,
            twitchURL: 'TBA',
            mapsPlayed: playedBeatmaps,
            gameMode,
            events,
            areQualifiers,
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

        //prevent duplicates, object quality!
        if(modifyQuery.prefix === 'teams'){
            modifyQuery.content['blue'] = _.uniq(modifyQuery.content['blue']);
            modifyQuery.content['red'] = _.uniq(modifyQuery.content['red']);

            modifyQuery.content['red'] = _.difference(modifyQuery.content['blue'], modifyQuery.content['red']);
        }

        const resp = modifyQuery.content && modifyQuery.prefix 
        ? await tournamentsSchema.updateOne(
            {[whereQuery.prefix]: whereQuery.content}, 
            {[modifyQuery.prefix]: modifyQuery.content})
        : {ok: 0};        

        const status = resp.ok ? {status:200, message:'Modified info, OK!'} : {status:400, message:"Missing/Issued data or not found user with that ID"};
        
        return {status};
    }

    public parseEventsObject = async (eventsDetail: object[], areQualifiers: boolean ) => {
        let getInfo : {[key: string] : number | string | object | object[]}[] = [];
        let playedBeatmaps : Array<object> = [];
        let countModes: {[key:string]: number} = {osu: 0, mania:0, ctb:0, taiko:0};

        //not sure why, it's forcing me to use Number instead of number (?)
        let judge : Number = 0;

        for await(let event of eventsDetail){
            const {detail, game, user_id} : tournamentsTypes.roomInfo = event;
            const eventTriggered : tournamentsTypes.eventDetail = { id: detail.id, type: detail.type, user_id };

            //maybe later it will be useful.
            switch( eventTriggered.type ){
                case 'match-created':
                    judge = eventTriggered.user_id;
                    break;
                case 'match-disbanded':
                    break;
                case 'host-changed':
                    break;
                case 'player-joined':
                    const isUserInDB = await users.displayOne(user_id);
                    if(isUserInDB.status !== 200){
                        await users.insert(user_id);
                    }

                    break;
                case 'player-left':
                    break;
                case 'other':
                    const gameDetails : tournamentsTypes.gameDetail = {mods: game.mods, info: game.beatmap, scores: game.scores, teamType: game.team_type}

                    gameDetails['info'] = {...gameDetails['info'] }

                    playedBeatmaps.push({
                        info:       gameDetails['info'],
                        scores:     gameDetails['scores'],
                        mods:       gameDetails['mods'],
                        teamType:   gameDetails['teamType'],
                        summaryScore: this.getSummaryScore( gameDetails['scores'], areQualifiers )
                    })
                    
                    countModes[game.mode]++;
                    break;
            }

        }

        //when events end, push all info into array of objects!
        getInfo.push( {judge} );
        getInfo.push( {'gameMode': this.selectMostPlayedMode(countModes) } );
        getInfo.push( {playedBeatmaps});
        return getInfo;
    }

    public sortTeams = async ( beatmapsPlayed: any, judge: string | number | object ) => {    
        let sortedTeams: { blue: Array<number>, red: Array<number> } = {
            blue: [],
            red: [],
        }
        let isSingleQualifyPlayer;
        
        for(let beatmap of beatmapsPlayed){
            for(let score of beatmap.scores){
                switch(true){
                    /* Team vs Team */
                    case 'team-vs' === beatmap.teamType && 'blue' === score.match.team  && !sortedTeams['blue'].includes(score.user_id):
                        sortedTeams['blue'].push(score.user_id);
                        break;
                    case 'team-vs' === beatmap.teamType && 'red' === score.match.team  && !sortedTeams['red'].includes(score.user_id):
                        sortedTeams['red'].push(score.user_id);
                        break;

                    /* 1 vs 1 below */
                    case 'head-to-head' === beatmap.teamType && sortedTeams['red'].length === 0:
                    /* Single Qualifications below*/
                    case 'head-to-head' === beatmap.teamType && isSingleQualifyPlayer === score.user_id && !sortedTeams['red'].includes(score.user_id):
                        sortedTeams['red'].push(score.user_id);
                        isSingleQualifyPlayer = score.user_id;
                        break;
                    
                    /* 1 vs 1 below */
                    case 'head-to-head' === beatmap.teamType && sortedTeams['blue'].length === 0 && isSingleQualifyPlayer !== score.user_id:
                    /* Single Qualifications below */
                    case 'head-to-head' === beatmap.teamType && isSingleQualifyPlayer !== score.user_id && !sortedTeams['blue'].includes(score.user_id):
                        sortedTeams['blue'].push(score.user_id);
                        break;
                }
            }
        }

        return sortedTeams;
    }

    public getSummaryScore = (beatmapPlayed: any, areQualifiers: boolean) => {
        let sortedScores: { [key: string]: number } = {
            blue: 0,
            red: 0,
        }
        

        for(let score of beatmapPlayed){
            switch(true){
                /* Qualifiers */
                case true === areQualifiers:
                    sortedScores['blue'] += parseInt(score.score);
                    break;

                /* Team vs Team */
                case 'blue' === score.match.team:
                    sortedScores['blue'] += parseInt(score.score);
                    break;
                case 'red' === score.match.team:
                    sortedScores['red'] += parseInt(score.score);
                    break;

                /* 1 vs 1! */
                case 'none' === score.match.team && score.match.slot === 0:
                    sortedScores['red'] += parseInt(score.score);
                    break;
                case 'none' === score.match.team && score.match.slot === 1:
                    sortedScores['blue'] += parseInt(score.score);
                    break;
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
        let tournamentNameFlatten:string = '';

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
                case ( !flags.isColonNoticed ):
                    tournamentNameFlatten += letter;
                    break;
                default:
                    if(flags.isColonNoticed && flags.isBracketOpen && !flags.firstTeamGot) teamsName.red += letter;
                    if(flags.isColonNoticed && flags.isBracketOpen && flags.firstTeamGot) teamsName.blue += letter;
                    break;
            }

        }

        return {teamsName, tournamentNameFlatten};
    }

    public selectMostPlayedMode = (matchPlayed: object) => {

        function whichIsMostPlayed(playedCount: number) {
          if (playedCount === _.max(matchPlayed)) return true;
          return false;
        }
    
        return _.findKey(matchPlayed, whichIsMostPlayed);
    }
}

export = new Tournaments();