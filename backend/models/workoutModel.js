const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    sets:{
        type: Number,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load:{
        type: Number,
        required: false
    }
}, {timestamps: true})

module.exports = mongoose.model('Workout', workoutSchema)
