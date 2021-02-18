const express = require('express')
const router = express.Router()
const User = require("../models/userModel.js")
const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')
const { hash, compare } = require('bcryptjs')


// Getting all Data
router.get('/', (req, res) => {
    User.find()
        .then(user => res.json(user))
        .catch(
            err => console.error(err))
})



// New user -  Post
router.post('/new', async (req, res) => {
    const password = req.body.password
    const email = req.body.email
    try {
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                error: "user already exists"
            })
        }
        const hashed_password = await hash(password, 10)
        const newUser = new User({ password: hashed_password, email })
        await newUser.save()
            .then(newUser => res.json(newUser))
            .catch(
                err => console.error(err))
    }
    catch (err) {
        console.error(err);
    }

})

//Login existing user
router.post('/login', async (req, res) => {
    const password = req.body.password
    const email = req.body.email
    try {
        const user = await User.findOne({ email })
        const validCredentials = await compare(password, user.password)
        if (!validCredentials) {
            return res.status(400).json({
                error: "Invalid Password or Credentials"
            })
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        return res.status(200).json({ token, user })
    }
    catch (err) {
        console.error(err);
    }

})








module.exports = router