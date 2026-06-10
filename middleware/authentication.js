require("dotenv").config()
const jwt = require("jsonwebtoken")


const authenitcation = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    if(token === null) return res.sendStatus(401)
    try {
        const userDecoder = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = userDecoder
        next()
    } catch (error) {
        res.sendStatus(403)
    }

}

module.exports = authenitcation