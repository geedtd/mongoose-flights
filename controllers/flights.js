import { Flight }   from '../models/flight.js'
export {
    newFlight as new,
    create,
    index
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