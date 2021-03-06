import mongoose, { Schema, Document } from "mongoose";

interface Tournament extends Document {
    id: Number;
    title: String;
    titleFlattened: String;
    teams: Object;
    users: Array<Object>;
    judge: Number | undefined;
    timeCreated: Date;
    timeEnded: Date | null; 
    mapsPlayed: Array<Object> | Object;
    twitchURL: String;
    events: Array<Object>;
    gameMode: string,
    areQualifiers: Boolean
}


const tournamentSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    titleFlattened: { type: String, required: true },
    teams: { type: Object },
    users: { type: Array },
    judge: { type: Number || undefined},
    timeCreated: { type: Date, required: true },
    timeEnded: { type: Date || null},
    mapsPlayed: { type: Array || Object },
    twitchURL: { type: String },
    events: { type: Array },
    gameMode: {type: String},
    areQualifiers: {type: Boolean}
})

const TournamentCreator = mongoose.model<Tournament>('Tournament', tournamentSchema);
export = TournamentCreator;