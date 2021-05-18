
import osuApi from './osuApi';
import usersSchema from '../database/users.schema';
import * as userTypes from '../validators/userTypes'

class Users {
    //@ts-ignore
    private query = (where: string | number | object) => usersSchema.where(where);

    public getUserApiInfo = async (userId: number) => await osuApi(`users/${userId}`);

    public displayAll = async () => {
        const result = await usersSchema.find((err: any, tournament: any) => {
            return tournament;
        });

        return result;
    };

    public displayOne = async (userId: Number) => {
        const result = await this.query( {id: userId} ).find((err: any, user: any) => {
            return user;
        });

        return result.length 
            ? {status: 200, result}
            : {status: 404, message: 'We do not have this user at our DB :('};
    };

    public displayCertain = async (whereQuery: Object) => {
        const result = await this.query(whereQuery).find((err: any, user: any) => {
            return user;
        });

        return result;
    };


    public insert = async (userId: any) => {
        if(userId === 0 || !userId) return {status : 422, response: "Missing ID"};

        const userInfo = await this.getUserApiInfo(userId);

        const newUser = new usersSchema({
            id: userInfo.id,
            username: userInfo.username,
            country: {
                code: userInfo.country.code,
                name: userInfo.country.name
            },
            ranking: {
                global: userInfo.statistics.global_rank,
                country: userInfo.statistics.country_rank,
            },
            playMode: userInfo.playmode,
            coverUrl: userInfo.cover_url,
            profileColor: userInfo.profile_colour
        })

        try{
            await newUser.save();
        }catch(err){
            return {status : 422, response: "This user is already registered or some data is missing"};
        }
    
        return {status : 200, response: "Inserted succesfully"};
    };

    public insertBulk = async (users: Array<object | any>) => {
        for await(let {id} of users){
            //prevent adding them to db, if they are already in the db.
            const isUserInDB = await this.displayOne(id);
            if(isUserInDB.status === 200) return;

            await this.insert(id)
        }
    }

    public delete = async (userId: Number) => {
        const {ok, deletedCount} = await usersSchema.deleteOne({id: userId}, (cb) => cb);

        const status = ok ? 200 : 400;
        return {status};
    }

    public update = async (userInfo: userTypes.updateSchema) => {
        const {whereQuery, modifyQuery} = userInfo;

        const resp = modifyQuery.content && modifyQuery.prefix 
            ? await usersSchema.updateOne(
                {[whereQuery.prefix]: whereQuery.content}, 
                {[modifyQuery.prefix]: modifyQuery.content})
            : {ok: 0};

        const status = resp.ok ? {status:200, message:'Modified info, OK!'} : {status:400, message:"Missing/Issued data or not found user with that ID"};
        return {status};
    }
}

export = new Users();