const express = require("express")


const getNotes = (req, res) => {
    res.json("All Notes")
}
const getNote = (req, res) => {
    res.json("Single Note")
}
const addNote = (req, res) => {
    res.json("Note Added")
}
const updateNote = (req, res) => {
    res.json("Update Note")
}
const deleteNote = (req, res) => {
    res.json("Delete Note")
}

module.exports = {
    getNotes,
    getNote,
    updateNote,
    deleteNote,
    addNote
}