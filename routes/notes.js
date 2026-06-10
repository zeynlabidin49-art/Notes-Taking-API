const express = require("express")
const router = express.Router()
const {
    getNotes,
    getNote,
    updateNote,
    deleteNote,
    addNote
} = require("../contollers/notes")

router.route("/").get(getNotes).post(addNote)
router.route("/:id").get(getNote).delete(deleteNote).patch(updateNote)

module.exports = router