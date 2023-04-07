// required packages
const express = require('express')
const router = express.Router()
const db = require('../models')
const bccrypt = require('bcrypt')
const cryptoJs = require('crypto-js')

// GET /users/new -- show route for a form that creates a new user (sign up for the app)
router.get('/new', (req, res) => {
    res.render('users/new.ejs')
})
// POST /users -- create a new user from the form @ GET /users/new
router.post('/', async (req, res) => {
    try {
        console.log(req.body)
        //do a find or create with the user's given email
        const [newUser, created] = await db.user.findOrCreate({
            where: {
                email: req.body.email
            }
        })
        if (!created) {
            // if the user's returns as found -- don't let them sign up
            console.log('user account exists')
            // instead redirect them to the login page
            res.redirect('users/login?message=Please login to your account to continue')
        } else {
            // hash the user's password before we add it to the db
            const hashedPassword = bccrypt.hashSync(req.body.password, 12)
            // save the user in the 
            newUser.password = hashedPassword
            await newUser.save()
            // encrypt the logged in user's id
            const encryptedPK = cryptoJs.AES.encrypt(newUser.id.toString(), process.env.ENC_KEY)
            // set the encrypted id as a cookie
            res.cookie('userId', encryptedPK.toString())
            // redirect user
            res.redirect('/users/profile')
        }
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }




    // res.send('create a new user if they do not exist already in the db, log a user in')
})

// GET /users/login -- show route for a form that lets a user login
router.get('/login', (req, res) => {
    res.send('show a form that lets the user log in')
})

// POST /users/login -- authenticate a user's credentials
router.post('/login', (req, res) => {
    res.send('verify credentials that are given by the user to log in')
})
// GET /users/logout -- log out the current user
router.get('/logout', (req, res) => {
    res.send('log a user out')
})
// GET /users/profile -- show authorized users their profile page
router.get('/profile', (req, res) => {
    res.send('show the currently logged in user their personal profile page')
})
// export the router instance
module.exports = router