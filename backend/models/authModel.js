const {Schema, model} = require('mongoose')

const userSchema = new Schema({
        name: {
            type: String,
            required: [true, 'Имя - обязательно!']
        },
        email: {
            type: String,
            required: [true, 'Email не может быть пустым'],
            unique: true
        },
        password: {
            type: String,
        }
    }, {
        timestamps: true
    }
)

module.exports = model('User', userSchema)
