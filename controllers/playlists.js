require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const router = express.Router()
const app = express();
const axios = require("axios")

app.set('view engine', 'ejs');


router.get ("/", async (req,res) => {
    const playlists = await db.playlist.findAll()
    res.render("playlists/index.ejs", {
        playlists
    })
})
router.post ("/playlists", async (req,res) => {
    try {
        const playlist = await db.playlist.create()
        res.render("playlists/index.ejs", {
            playlist
        })
    } catch(err) {
        console.log(err)
        res.status(500).send("Server had an error")
    }
})
router.get ("/:id", async (req,res) => {
    try {
        const playlist = await db.playlist.findbyId()
        res.render("playlists/index.ejs", {
            playlist
        })
    } catch(err) {
        console.log(error)
        res.status(500).send("Server had an error")
    }
})
app.get ("/playlists", async (req,res) => {

})
app.get ("/playlists", async (req,res) => {

})
  
module.exports = router