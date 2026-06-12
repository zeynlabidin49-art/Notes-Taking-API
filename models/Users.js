const mongoose = require("mongoose")


const userSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            required: [true, "Please Provide a username"],
            maxlength: 100,
            trim: true,
        }, 
        hashedPassword: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters long'],
            // select: false // Automatically hides password from search results for safety
        },
    },
    { 
        timestamps: true ,
    }
)

module.exports = mongoose.model('User', userSchema)