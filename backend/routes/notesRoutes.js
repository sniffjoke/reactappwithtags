const express = require('express')
const router = express.Router()
const {deleteNote, setNote, getNotes, updateNote} = require('../controllers/noteController')
const {protect} = require("../middlewares/authMiddleware");

router.route('/').get(protect, getNotes).post(protect, setNote)
router.route('/:id').delete(protect, deleteNote).put(protect, updateNote)

module.exports = router
