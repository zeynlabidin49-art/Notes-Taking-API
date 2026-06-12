const mongoose = require("mongoose")


const tokenSchema = new mongoose.Schema(
    {
        tokenValue: {
            type: String,
            required: true,
            unique: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, "The Token must belong to an owner!"]
        },
        deviceId:{
            type: String,
            required: true
        }
    },
    { 
        timestamps: true,
    }
)

module.exports = mongoose.model('Token', tokenSchema)