const express = require("express")
const Note = require("../models/Notes")

const getNotes = async(req, res) => {
    try {
        const allNotes = await Note.find()
        if (allNotes===null) return res.json({msg: 'there is no notes'})
        res.status(200).json({allNotes})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Server Error"});
    }
}
const getNote = async(req, res) => {
    try {
        const noteId = req.params.id
        console.log(noteId)
        if(!noteId) return res.status(400).json({msg: "Provide Id"})
        const note = await Note.findOne({_id: noteId})
        if(note === null) return res.status(403).json({msg: "note don't exist!"})
        res.status(200).json({note})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Server Error"});
    }
}
const addNote = async(req, res) => {
    try {
        const user = req.user.id
        const description = req.body.description
        const title = req.body.title
        if (!title, !description) return res.status(400).json({msg: "title and description are required"})
        const newNote = await Note.create({title,description,user})

        res.json("Note Added")
    } catch (error) {
        console.log(error)
    }

}
const updateNote = async(req, res) => {
    try {
        const id = req.params.id
        const updatedData = req.body
        console.log("updated data ", updatedData)
        const updatedNote = await Note.findByIdAndUpdate(id,updatedData,{returnDocument: 'after', runValidators: true})
        if (!updatedData) return res.status(404).json({ message: "Note not found" });
        res.status(200).json({updatedNote})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Server Error"});
    }
}
const deleteNote = async(req, res) => {
    try {
        const noteId = req.params.id
        if(!noteId) return res.status(400).json({msg: "Provide Id"})
        const note = await Note.findByIdAndDelete({_id: noteId})
        if(note === null) return res.status(403).json({msg: "note don't exist!"})
        res.status(200).json({note})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Server Error"});
    }
}

module.exports = {
    getNotes,
    getNote,
    updateNote,
    deleteNote,
    addNote
}