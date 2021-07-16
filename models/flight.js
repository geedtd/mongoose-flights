import mongoose from 'mongoose'

const Schema = mongoose.Schema

export {
    Flight
}

const ticketSchema = new Schema({
    seat: {
        type: String, 
        match: /[A-F][1-99]|d?/
    },
    price: {
        type: Number,
        min: 0
    }
})

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
        minimum: [10, 'Must be at least 10, got {VALUE}'],
        maximum: 9999,
        required: [true, 'Add a flight']
    },
    departs: {
        type: Date,
        default: function() {
            let depart = new Date()
            return depart.setFullYear(depart.getFullYear() + 1)
        }
    },
    tickets: [ticketSchema],
})

const Flight = mongoose.model('Flight', flightSchema)