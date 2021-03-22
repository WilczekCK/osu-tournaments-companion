import mongoose, { Schema, Document } from "mongoose";

interface User extends Document {
    id: Number;
    username: String,
    country: Array<String>,
    avatarUrl: String,
    profileColor: String
}

const userSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    username: { type: String, required: true },
    country: { type: Object, required: true },
    avatarUrl: { type: String },
    profileColor: { type: String }
})

const userCreator = mongoose.model<User>('User', userSchema);
export = userCreator;