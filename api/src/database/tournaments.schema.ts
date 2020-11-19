import mongoose, { Schema } from "mongoose";

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

const Tournament = mongoose.model('Tournament', tournamentSchema);

//const lol = new Tournament({id: 1, title:'Test', titleFlattened:'Tst', teams:[1,2,3,4,5], judge:"Boom", timeCreated:Date.now(), roomURL:"localhost", twitchURL:'osutv', mapsIdPlayed:[111,222,333]});
//lol.save();

export = Tournament;