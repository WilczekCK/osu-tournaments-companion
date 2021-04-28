import mongoose, { Schema, Document } from "mongoose";

interface User extends Document {
    id: Number;
    username: String,
    country: Array<String>,
    coverUrl: String,
    profileColor: String
    raking: Object
}

const userSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    username: { type: String, required: true },
    country: { type: Object, required: true },
    coverUrl: { type: String },
    profileColor: { type: String },
    ranking: { type: Object}
})

const userCreator = mongoose.model<User>('User', userSchema);
export = userCreator;