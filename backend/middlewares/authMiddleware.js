const asyncHandler = require('express-async-handler')
const User = require('./../models/authModel')
const jwt = require('jsonwebtoken')

const protect = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decodedToken = jwt.verify(token, process.env.JWT_KEY)
            req.user = await User.findById(decodedToken.id).select('-password')

            next()
        } catch (e) {
            console.log(e)
            res.status(401)
            throw new Error('Not authorized')
        }
    }
    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = {
    protect
}
