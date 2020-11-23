import mongoose, { Schema, Document } from "mongoose";

interface User extends Document {
    id: Number;
    username: String,
    country: String,
    playStyle: Array<object>,
}

const userSchema = new Schema({
    id: { type: Number, required: true },
    username: { type: String, required: true },
    country: { type: String, required: true },
    playStyle: { type: Array, required: true },
})

const userCreator = mongoose.model<User>('User', userSchema);
export = userCreator;