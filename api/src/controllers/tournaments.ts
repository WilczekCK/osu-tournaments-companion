
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
    }
}

export = new Tournaments();

/*   
    mongo.getConnection();
    const lol = new Tournament({id: 1, title:'Test', titleFlattened:'Tst', teams:[1,2,3,4,5], judge:"Boom", timeCreated:Date.now(), roomURL:"localhost", twitchURL:'osutv', mapsIdPlayed:[111,222,333]});
    lol.save();

    tournament.find((err: any, tournament: any) => {
        if(err) return console.log('err')
        console.log(tournament);
    })
    mongo.stopConnection();
 */