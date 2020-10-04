require("dotenv").config()

const viewEmployees = require("../services/retrieveService")

module.exports = async (req, res) => {
  try {
    const results = await viewEmployees(req.user.currentUserRoleId, req.user.currentUserDeptId)
    if (results) {
      res.status(200).send({
        success: true,
        employees: results
      })
    } else {
      res.status(500).send({
        success: false,
        message: "Nothing retrieved! Unauthorized access or no results!"
      })
    }
  } catch (err) {
    console.log({err})
  }
}