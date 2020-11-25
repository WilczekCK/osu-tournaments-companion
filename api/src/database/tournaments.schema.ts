import mongoose, { Schema, Document } from "mongoose";

interface Tournament extends Document {
    id: Number;
    title: String;
    titleFlattened: String;
    teams: Array<Number>;
    judge: String;
    timeCreated: Date;
    roomURL: String;
    twitchURL: String;
    mapsIdPlayed: Array<Number>;
    isActive: Boolean;
}

const tournamentSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    titleFlattened: { type: String, required: true },
    teams: { type: Array},
    judge: { type: String},
    timeCreated: { type: Date, required: true },
    roomURL: { type: String, required: true },
    twitchURL: { type: String },
    mapsIdPlayed: { type: Array},
    isActive: {type: Boolean, required: true}
})

const TournamentCreator = mongoose.model<Tournament>('Tournament', tournamentSchema);
export = TournamentCreator;