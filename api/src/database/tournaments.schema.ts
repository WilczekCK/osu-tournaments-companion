import mongoose, { Schema, Document } from "mongoose";

interface Tournament extends Document {
    id: Number;
    title: String;
    titleFlattened: String;
    //teams: Array<Number>;
    users: Array<Object>;
    judge: Number | undefined;
    timeCreated: Date;
    timeEnded: Date | null; 
    mapsPlayed: Array<Object> | Object;
    twitchURL: String;
    events: Array<Object>;
}


const tournamentSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    titleFlattened: { type: String, required: true },
    //teams: { type: Array },
    users: { type: Array },
    judge: { type: Number || undefined},
    timeCreated: { type: Date, required: true },
    timeEnded: { type: Date || null},
    mapsPlayed: { type: Array || Object },
    twitchURL: { type: String },
    events: { type: Array }
})

const TournamentCreator = mongoose.model<Tournament>('Tournament', tournamentSchema);
export = TournamentCreator;