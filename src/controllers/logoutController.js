const { deleteToken } = require("../services/tokenService")

module.exports = async (req, res) => {
  const refreshToken = req.body.token
  const result = await deleteToken(refreshToken)
  if (result) {
    if (result.affectedRows) {
      res.status(200).send({
        success: true,
        message: "Logged out!"
      })
    } else {
      res.status(404).send({
        success: false,
        message: "Invalid token!"
      })
    }
  } else {
    res.status(500).send({
      success: false,
      message: "Invalid token!"
    })
  }
}