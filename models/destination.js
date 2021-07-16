import mongoose from 'mongoose'

const Schema = mongoose.Schema

export {
    Destination
}
const destinationSchema = new Schema({
    airport: {
        type: String,
        unique: true
    }
})

const Destination = mongoose.model('Destination', destinationSchema)