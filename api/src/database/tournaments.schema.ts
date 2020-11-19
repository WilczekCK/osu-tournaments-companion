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
}

const tournamentSchema = new Schema({
    id: Number,
    title: String,
    titleFlattened: String,
    teams: Array,
    judge: String,
    timeCreated: Date,
    roomURL: String,
    twitchURL: String,
    mapsIdPlayed: Array,
})

const TournamentCreator = mongoose.model<Tournament>('Tournament', tournamentSchema);
export = TournamentCreator;