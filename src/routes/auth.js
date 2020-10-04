const express = require("express")
const auth = express.Router()

const employeeLogin = require("../controllers/loginController")
const employeeLogout = require("../controllers/logoutController")
const newAccessToken = require("../controllers/tokenController")

auth.post("/login", employeeLogin)
auth.post("/logout", employeeLogout)
auth.post("/token", newAccessToken)

module.exports = auth