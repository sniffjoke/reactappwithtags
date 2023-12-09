const asyncHandler = require('express-async-handler')
const Note = require('./../models/noteModel')

const getNotes = asyncHandler(async (req, res) => {
    // const notes = await Note.find({user: req.user.id})
    const note = await Note.find()


    res.status(200).json(note)
})

const setNote = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const note = await Note.create({
        text: req.body.text,
        // user: req.user.id
        tagsArray: req.body.tagsArray
    })


    res.status(200).json(note)
})



const updateNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id)

    if (!note) {
        res.status(400)
        throw new Error('Заметка не найдена')
    }

    if (!req.user) {
        res.status(401)
        throw new Error('Пользователь не найден')
    }

    if (note.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Пользователь не авторизован')
    }

    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedNote)
})

const deleteNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id)

    if (!note) {
        res.status(400)
        throw new Error('Заметка не найдена')
    }

    if (!req.user) {
        res.status(401)
        throw new Error('Пользователь не найден')
    }

    if (note.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await note.deleteOne()

    // res.status(204).json('Deleted')
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getNotes,
    setNote,
    deleteNote,
    updateNote
}
