const jwt = require('jsonwebtoken')
const tokenModel = require('../models/tokenModel')
const User = require('../models/authModel')
const UserDto = require("../dtos/userDto");

const generateTokens = (id) => {
    const accessToken = jwt.sign({id}, process.env.JWT_KEY, {
        expiresIn: '15s'
    })
    const refreshToken = jwt.sign({id}, process.env.JWT_KEY_REFRESH, {
        expiresIn: '30d'
    })
    return {
        accessToken,
        refreshToken
    }
}

const validateAccessToken = (token) => {
    try {
        const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        return userData
    } catch (e) {
        return null
    }
}

const saveToken = async (userId, refreshToken) => {
    const tokenData = await tokenModel.findOne({user: userId})
    if (tokenData) {
        tokenData.refreshToken = refreshToken
        return tokenData.save()
    }
    const token = await tokenModel.create({user: userId, refreshToken})
    return token
}

const removeToken = async (refreshToken) => {
    const tokenData = await tokenModel.deleteOne({refreshToken})
    return tokenData
}


const findToken = async (refreshToken) => {
    const tokenData = await tokenModel.findOne({refreshToken})
    return tokenData
}

const refreshTokenHandler = async (refreshToken) => {
    if (!refreshToken) {
        console.log('Нет токена')
    }
    const userData = jwt.verify(refreshToken, process.env.JWT_KEY_REFRESH)
    const tokenFromDb = await findToken(refreshToken)
    if (!userData || !tokenFromDb) {
        throw new Error('Залогиньтесь еще раз')
    }
    const user = await User.findById(userData.id)
    const tokens = generateTokens(user.id)

    await saveToken(user.id, tokens.refreshToken)

    return {
        _id: user.id,
        ...tokens
    }
}


module.exports = {generateTokens, saveToken, removeToken, refreshTokenHandler}
