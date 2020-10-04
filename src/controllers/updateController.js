const updateEmployee = require("../services/updateService")

module.exports = async (req, res) => {
  try {
    const data = req.body
    const results = await updateEmployee(
      data, 
      req.user.currentUserId,
      req.user.currentUserRoleId, 
      req.user.currentUserDeptId
    )

    if (results) {
      if (results.affectedRows) {
        res.status(200).send({
          success: true,
          message: "Updated!",
        })
      } else {
        res.status(404).send({
          success: false,
          message: "Error! Record not found or does not exist!"
        })
      }
    } else {
      res.status(500).send({
        status: results,
        message: "Update error! Unauthorized action!"
      })
    }
  } catch (err) {
    console.log({err})
  }
}