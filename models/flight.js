import mongoose from 'mongoose'

const Schema = mongoose.Schema

export {
    Flight
}

const flightSchema = new Schema({
    airline: {
        type: String,
        enum: ['American', 'Southwest', 'United']
    },
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
        default: 'DEN',
    },
    flightNo: {
        type: Number,
        minimum: 10,
        maximum: 9999
    },
    departs: {
        type: Date,
        default: function() {
            let depart = new Date()
            return depart.setFullYear(depart.getFullYear() + 1)
        }
    },
})
const Flight = mongoose.model('Flight', flightSchema)