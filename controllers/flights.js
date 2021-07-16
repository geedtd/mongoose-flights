import { Flight }   from '../models/flight.js'
import { Destination } from '../models/destination.js'

export {
    newFlight as new,
    create,
    index, 
    show, 
    createTicket,
    addDestination
}

function addDestination(req, res){
    Flight.findById(req.params.id, function (err,flight) {
        flight.destination.push(req.body.destinationId)
        flight.save(function(err){
            res.redirect(`/flights/${flight._id}`)
        })
    })
}
function createTicket(req, res) {
    Flight.findById(req.params.id, function(err, flight){
        if (err) return res.render('flight/show')
        flight.tickets.push(req.body)
        flight.save(function(err){
            res.redirect(`/flights/${flight._id}`)
        })
        
    })
}

function index(req, res) {
    Flight.find({}, function(err, flights) {
        res.render('flights/index', {
            err: err,
            flights: flights
        })        
    })
}
function create(req, res) {
    if (!req.body.flightNo) {
        req.body.flightNo = 10
    }
    const flight = new Flight(req.body)
    flight.save(function(err) {
        if (err) return res.redirect('/flights/new')
        res.redirect('/flights')
    })
}

function newFlight(req, res) {
    res.render('flights/new')
}

function show(req, res) {
    Flight.findById(req.params.id).populate('destinations').exec(function (err, flight){
        Destination.find({_id: {$nin: flight.destinations}},
        function(err, newDestination){
            res.render('flights/show', {
                flight, 
                newDestination
            })
        })
    })
}
