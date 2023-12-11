const {Schema, model} = require("mongoose");

const noteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: [true, 'Поле заметки должно быть заполнено. Невозможно создать пустую заметку']
    },
    tagsArray: {
        type: [String]
    }
}, {
    timestamps: true
})

module.exports = model('Note', noteSchema)
