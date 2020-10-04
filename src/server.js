require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")

const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const employeeRoute = require("./routes/employee")
const authRoute = require("./routes/auth")
app.use("/employee", employeeRoute)
app.use("/auth", authRoute)

const port = 3001

app.listen(port, () => {
   console.log("Listening on port ", port)
})