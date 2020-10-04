require("dotenv").config()

const deleteEmployee = require("../services/deleteService")
const { deletePermission } =  require("../auth/checkPermission")

module.exports = async (req, res) => {
  const allowed = await deletePermission(
    req.user,
    req.body.employeeId
  )
  if (allowed) {
    try {
      const { employeeId } = req.body
      const results = await deleteEmployee(employeeId)
  
      if (results) {
        console.log({results})
        if (results.affectedRows) {
          res.status(200).send({
            success: true,
            message: "Successfully deleted!"
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
          message: "Error! Not deleted!"
        })
      }
    } catch (err) {
      console.log({err})
    }
  } else {
    res.status(403).send({
      status: false,
      message: "Forbidden! Not allowed to delete employee!"
    })
  }
}