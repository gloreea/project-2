require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const router = express.Router()
const app = express();
const axios = require("axios")
const db = require('../models')

app.set('view engine', 'ejs');

// GET /playlists -- READ all playlists
router.get ("/", async (req,res) => {
    const playlists = await db.playlist.findAll()
    res.render("playlists/index.ejs", {
        playlists
    })
})
// GET /playlists/new -- SHOW form to CREATE playlist
router.get ("/new", async (req,res) => {
        res.render("playlists/new.ejs")
})
// POST /playlists -- intake form data from /new and CREATE playlist
router.post ("/new", async (req,res) => {
    const playlists = await db.playlist.findAll()
    try {
        let [newPlaylist, created] = await db.playlist.findOrCreate({
            where: {
                name: req.body.name,
                userId: res.locals.user.id
            }
        })
        playlists.push(req.body)
        res.redirect("/playlists")
    } catch(err) {
        console.log(err)
        res.status(500).send("Server had an error")
    }
})

router.get ("/:id", async (req,res) => {
    try {
        const foundPlaylist = await db.playlist.findOne({
            where: {
                id: req.params.id,
            }
        })
        if (!foundPlaylist ) {
            res.redirect("/")
        } else {
            res.render("playlists/details.ejs", {
                foundPlaylist
            })
        }
    } catch(err){
        console.log(err)
    }
})
router.delete ("/:id", async (req,res) => {
    try {
        const deletePlaylist = await db.playlist.destroy({
            where: {
                id: req.params.id
            }
        })

        res.redirect("/playlists")
    } catch(err) {
        console.log(err)
    }
})

router.put("/:id", async (req, res) => {
    try {
        const foundPlaylist = await db.playlist.findOne({
            where: {
                id: req.body.id
                
            }
        })
        foundPlaylist.name = req.body.name
        await foundPlaylist.save()
        res.render("playlists/details.ejs",{
            foundPlaylist
        })
    } catch(err){
        console.log(err)
    }
})
  
module.exports = router