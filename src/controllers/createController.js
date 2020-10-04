require("dotenv").config()
const addEmployee = require("../services/createService")
const { createPermission } = require("../auth/checkPermission")

module.exports = async (req, res) => {
  const allowed = createPermission(
    req.user.currentUserRoleId,
    req.user.currentUserDeptId, 
    req.body.roleId,
    req.body.deptId
  )
  if (allowed) {
    try {
      const data = req.body
      const results = await addEmployee(data)
      if (results) {
        res.status(200).send({
          success: true,
          message: "Employee added!",
        })
      } else {
        res.status(500).send({
          status: results,
          message: "Error! Employee not added!"
        })
      }
    } catch (err) {
      console.log({err})
    }
  } else {
    res.status(403).send({
      status: false,
      message: "Forbidden! Action restricted or not allowed for current account!"
    })
  }
}