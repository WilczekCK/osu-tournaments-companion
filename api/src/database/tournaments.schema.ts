import mongoose, { Schema, Document } from "mongoose";

interface Tournament extends Document {
    id: Number;
    title: String;
    titleFlattened: String;
    //teams: Array<Number>;
    users: Array<Object>;
    //judge: String;
    timeCreated: Date;
    timeEnded: Date | Object; 
    //roomURL: String;
    twitchURL: String;
    //mapsIdPlayed: Array<Number>;
    //isActive: Boolean;
    events: Array<Object>;
}

const tournamentSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    titleFlattened: { type: String, required: true },
    //teams: { type: Array },
    users: { type: Array },
    //judge: { type: String },
    timeCreated: { type: Date, required: true },
    timeEnded: { type: Date || Object, required:true},
    //roomURL: { type: String, required: true },
    twitchURL: { type: String },
    //mapsIdPlayed: { type: Array },
    //isActive: {type: Boolean, required: true}
    events: { type: Array }
})

const TournamentCreator = mongoose.model<Tournament>('Tournament', tournamentSchema);
export = TournamentCreator;