require("dotenv").config()
const express = require("express")
const app = express()

const authRouter = require("./routes/auth")
const notesRouter = require("./routes/notes")
const connectDB = require("./db/connect")
const authenitcationMidleware = require("./middleware/authentication")
const notFoundMidleware = require("./middleware/notFound")


app.use(express.json())

//routes
app.use("/api/v1/notes", authenitcationMidleware, notesRouter)
app.use("/api/v1/auth", authRouter) 

app.get("/", authenitcationMidleware, (req, res) => {
    res.json("Welcome to the main router")
})

app.use(notFoundMidleware)

const port = process.env.PORT || 3000 

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log("server is listening on port: ", port)
        })
    } catch (error) {
        console.log(error)
    }
}

start()  