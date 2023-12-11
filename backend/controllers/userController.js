const asyncHandler = require('express-async-handler')
const User = require('../models/authModel')
const bcrypt = require('bcryptjs')
const {generateTokens, saveToken, removeToken, refreshTokenHandler} = require("../services/tokenService");

const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Пожалуйста, заполните все поля')
    }

    const userExists = await User.findOne({email})

    if (userExists) {
        res.status(400)
        throw new Error('Пользователь уже существует. Введите другие данные')
    }

    const salt = await bcrypt.genSaltSync(Number(process.env.SALT))
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })
    const {accessToken, refreshToken} = generateTokens(user.id)
    await saveToken(user.id, refreshToken)
    if (user) {
        res.cookie('refreshToken', refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        res.status(201).json({
            user: {
                _id: user.id,
                name: user.name,
                email: user.email,
            },
            tokens: {
                accessToken
            }
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})
    if (!user) {
        throw new Error('Пользователь с данным e-mail не найден')
    }

    const {accessToken, refreshToken} = generateTokens(user.id)

    await saveToken(user.id, refreshToken)

    if (user && (await bcrypt.compareSync(password, user.password))) {
        res.cookie('refreshToken', refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        res.status(200).json({
            user: {
                _id: user.id,
                name: user.name,
                email: user.email,
            },
            tokens: {
                accessToken,
                refreshToken
            }
        })
    } else {
        res.status(400)
        throw new Error('Неправильный пароль')
    }
})

const refreshTokenUser = asyncHandler (
    async (req, res) => {
        const {refreshToken} = req.cookies
        const userData = await refreshTokenHandler(refreshToken)
        return res.json(userData)
    }
)

const logout = async (req, res) => {
        const {refreshToken} = req.cookies
        const token = await removeToken(refreshToken)
        await res.clearCookie('refreshToken')
        return res.json(token)
    }

const getMe = asyncHandler(async (req, res) => {
    res.json(req.user)
})

module.exports = {
    registerUser,
    loginUser,
    getMe,
    logout,
    refreshTokenUser
}
