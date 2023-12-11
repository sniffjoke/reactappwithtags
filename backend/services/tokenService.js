const jwt = require('jsonwebtoken')
const tokenModel = require('../models/tokenModel')
const User = require('../models/authModel')

const generateTokens = (id) => {
    const accessToken = jwt.sign({id}, process.env.JWT_KEY, {
        expiresIn: '3000s'
    })
    const refreshToken = jwt.sign({id}, process.env.JWT_KEY_REFRESH, {
        expiresIn: '30d'
    })
    return {
        accessToken,
        refreshToken
    }
}

const refreshAccessToken = (id) => {
    const accessToken = jwt.sign({id}, process.env.JWT_KEY, {
        expiresIn: '30000s'
    })
    const refreshToken = jwt.sign({id}, process.env.JWT_KEY_REFRESH, {
        expiresIn: '30d'
    })
    return accessToken
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
    try {
        const userData = jwt.verify(refreshToken, process.env.JWT_KEY_REFRESH)
        const tokenFromDb = await findToken(refreshToken)
        if (!userData || !tokenFromDb) {
            throw new Error('Залогиньтесь еще раз')
        }
        const user = await User.findById(userData.id)
        const token = refreshAccessToken(user.id)

        return {
            _id: user.id,
            token
        }
    } catch (e) {
        throw new Error('Авторизуйтесь')
    }

}


module.exports = {generateTokens, saveToken, removeToken, refreshTokenHandler}
