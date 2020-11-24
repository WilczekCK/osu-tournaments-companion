
import mongo from "./mongo";
import usersSchema from '../database/users.schema';

type insertSchema = {
    id: number,
    username: string,
    country: string,
    playStyle: Array<number>,
}

type UpdateSchema = {
    whereQuery: {
        [key: string]: string | number,
    },
    modifyQuery: {
        [key: string]: string | number;
    },
}

class Users {
    private connect = () => mongo.getConnection();
    private disconnect = () => mongo.stopConnection();
    //@ts-ignore
    private query = (where: string | number | object) => usersSchema.where(where);
    private error: string;

    public displayAll = async () => {
        this.connect();
        
        const result = await usersSchema.find((err: any, tournament: any) => {
            return tournament;
        });

        this.disconnect();
        return result;
    };

    public displayOne = async (userId: Number) => {
        this.connect();
        

        const result = await this.query( {id: userId} ).find((err: any, user: any) => {
            return user;
        });

        this.disconnect();
        return result;
    };

    public displayCertain = async (whereQuery: Object) => {
        this.connect();
        
        const result = await this.query(whereQuery).find((err: any, user: any) => {
            return user;
        });

        this.disconnect();
        return result;
    };

    public insert = async (userInfo: insertSchema) => {
        this.connect()

        const newUser = new usersSchema(userInfo);
            
        await newUser.save();
    
        this.disconnect();
        
        return {status : 200}
    };

    public delete = async (userId: Number) => {
        this.connect()

        const {ok, deletedCount} = await usersSchema.deleteOne({id: userId}, (cb) => cb);
        
        this.disconnect();

        const status = ok ? 200 : 400;
        return {status, deletedCount};
    }

    public update = async (userInfo: UpdateSchema) => {
        this.connect()

        const {whereQuery, modifyQuery} = userInfo;
        const {ok, nModified} = await usersSchema.updateOne(
            {[whereQuery.prefix]: whereQuery.content}, 
            {[modifyQuery.prefix]: modifyQuery.content}
        );

        this.disconnect()

        const status = ok ? 200 : 400;
        return {status, modified: nModified};
    }
}

export = new Users();