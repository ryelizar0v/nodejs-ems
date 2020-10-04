require("dotenv").config()
const { checkToken } = require("../services/tokenService")
const { verify } = require("jsonwebtoken")
const { generateAccessToken } = require("../auth/generateToken")

module.exports = async (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken == null) {
    res.status(401).send({
      success: false,
      message: "Unauthorized access!"
    })
  } else {
    const result = await checkToken(refreshToken)
    if (result) {
      if (result.length) {
        verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
          if (err) {
            res.status(404).send({
              success: false,
              message: "Invalid token!"
            })
          } else {
            const accessToken = generateAccessToken({
              name: user.name,
              currentUserId: user.currentUserId,
              currentUserRoleId: user.currentUserRoleId,
              currentUserDeptId: user.currentUserDeptId
            })
            res.status(200).send({
              success: true,
              accessToken: accessToken
            })
          }
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
        message: "Invalid token"
      })
    }
  }
}