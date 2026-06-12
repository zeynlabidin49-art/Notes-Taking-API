const express = require("express")
const router = express.Router()
const {
    register,
    login,
    token,
    logout
} = require("../contollers/auth")

router.route("/login").post(login)
router.route("/register").post(register)
router.route("/token").post(token)
router.route("/logout").delete(logout)

module.exports = router