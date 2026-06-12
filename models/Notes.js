const mongoose = require("mongoose")


const noteSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: [true, "Please Provide a title"],
            maxlength: 100,
            trim: true,
        },
        description:{
            type: String,
            required: [true, "Please Provide a description"],
            trim: true,
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, "The Note must belong to an owner!"]
        },
        tags:{
            type: [String],
            default: [],
        },
        isPinned: {
            type: Boolean,
            default: false,
        }
    },
    { 
        timestamps: true ,
    }
)

module.exports = mongoose.model('Note', noteSchema)