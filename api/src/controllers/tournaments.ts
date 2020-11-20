
import mongo from "./mongo";
import tournamentsSchema from '../database/tournaments.schema';
import tournaments from "../routes/tournaments";

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
        return result;
    };

    public displayOne = async (tournamentId: Number) => {
        this.connect();
        

        const result = await this.query( {id: tournamentId} ).find((err: any, tournament: any) => {
            return tournament;
        });

        this.disconnect();
        return result;
    };

    public displayCertain = async (whereQuery: Object) => {
        this.connect();
        
        const result = await this.query(whereQuery).find((err: any, tournament: any) => {
            return tournament;
        });

        this.disconnect();
        return result;
    };

    public insert = async (tournamentInfo: Object) => {
        this.connect()

        const newTournament = new tournamentsSchema(tournamentInfo);
        await newTournament.save();

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
}

export = new Tournaments();