require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const router = express.Router()
const app = express();
const axios = require("axios")
const db = require('../models')

app.set('view engine', 'ejs');


// ROUTES
router.get('/', function(req, res) {
    res.render('tracks/index.ejs');
})

router.get('/search', async(req, res) => {
    axios.get(`http://ws.audioscrobbler.com/2.0/?method=track.search&track=${req.query.search}&api_key=${process.env.API_KEY}&format=json`)
        .then(response => {
            const trackResults = response.data.results.trackmatches.track
            console.log(req.query.search)
            console.log(trackResults)
            res.render("tracks/results.ejs", {
                search: req.query.search,
                trackResults
                // .data.search.results.trackmatches.track
            })
           
            })
            .catch(err => {
                console.log(err)
                res.status(500).send("Server had an error")

            })
        })
// POST
router.post('/', (req, res) => {
    console.log(req.body)
    const trackResults = response.data.results.trackmatches.track
    trackResults.push(req.body)
})
// GET /tracks/:track_id -- shpw details about a track
router.get("/details", async(req, res) => {
    const url = (`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${process.env.API_KEY}&track=${req.query.track_name}&artist=${req.query.artist_name}&format=json`)
    console.log(url)
    axios.get(url)
    .then(response => {
        const trackResult = response.data.track
        console.log(response)
        console.log(req.query.track_name)
        res.render("tracks/details.ejs", {
            track: trackResult
        })
     
        })
        .catch(error => {
        console.log(error)
        res.status(500).send("Server had an error")
        })
    })
  
module.exports = router