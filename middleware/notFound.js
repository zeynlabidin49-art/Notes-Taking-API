const notFound = (req, res)=> {
    res.status(404).json("Rout Does Not Exist")
}

module.exports = notFound