
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

        return result.length 
            ? {status: 200, result}
            : {status: 404, message: 'We do not have this user at our DB :('};
    };

    public displayCertain = async (whereQuery: Object) => {
        this.connect();
        
        const result = await this.query(whereQuery).find((err: any, user: any) => {
            return user;
        });

        this.disconnect();
        return result;
    };

    public displayFew = async (users: Array<Object>) => {
        this.connect();
        const result : Array<Object> = [];

        for await (let user of users){
            //@ts-ignore
            await this.displayOne( user.id );
            //result.push(getInfo);
        }

        console.log(result);

        this.disconnect();
        return result;
    };

    public insert = async (userInfo: insertSchema) => {
        this.connect()

        const newUser = new usersSchema(userInfo);

        try{
            await newUser.save();
        }catch(err){
            return {status : 422, response: "This user is already registered or some data is missing"};
        }
    
        this.disconnect();

        return {status : 200, response: "Inserted succesfully"};
    };

    public delete = async (userId: Number) => {
        this.connect()

        const {ok, deletedCount} = await usersSchema.deleteOne({id: userId}, (cb) => cb);
        
        this.disconnect();

        const status = ok ? 200 : 400;
        return {status};
    }

    public update = async (userInfo: UpdateSchema) => {
        this.connect()
        
        const {whereQuery, modifyQuery} = userInfo;

        const resp = modifyQuery.content && modifyQuery.prefix 
            ? await usersSchema.updateOne(
                {[whereQuery.prefix]: whereQuery.content}, 
                {[modifyQuery.prefix]: modifyQuery.content})
            : {ok: 0};

        this.disconnect()

        const status = resp.ok ? {status:200, message:'Modified info, OK!'} : {status:400, message:"Missing/Issued data or not found user with that ID"};
        return {status};
    }
}

export = new Users();