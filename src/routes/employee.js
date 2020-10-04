require("dotenv").config()
const express = require("express")
const router = express.Router()

const addEmployee = require("../controllers/createController")
const viewEmployees = require("../controllers/retrieveController")
const updateEmployee = require("../controllers/updateController")
const deleteEmployee = require("../controllers/deleteController")

const checkAuth = require("../auth/validateToken")

router.post("/create", checkAuth, addEmployee)
router.post("/", checkAuth, viewEmployees)
router.post("/update", checkAuth, updateEmployee)
router.post("/delete", checkAuth, deleteEmployee)

module.exports = router