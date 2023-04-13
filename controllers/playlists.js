require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const router = express.Router()
const app = express();
const axios = require("axios")

app.set('view engine', 'ejs');


router.get ("/", async (req,res) => {
    res.render("playlists/index.ejs")
})
app.post ("/playlists", async (req,res) => {

})
app.post ("/playlists", async (req,res) => {

})
app.get ("/playlists", async (req,res) => {

})
app.get ("/playlists", async (req,res) => {

})
  
module.exports = router