require("dotenv").config()
const employeeLogin = require("../services/loginService")
const { generateAccessToken, generateRefreshToken } = require("../auth/generateToken")
const { addToken } = require("../services/tokenService")

module.exports = async (req, res) => {
  try {
    const data = req.body
    const results = await employeeLogin(data)

    if (results) {
      let userData = {
        name: results[0].username,
        currentUserId: results[0].employee_id,
        currentUserRoleId: results[0].role_id,
        currentUserDeptId: results[0].dept_id
      }
      const accessToken = generateAccessToken(userData)
      const refreshToken = generateRefreshToken(userData)
      await addToken(refreshToken)

      res.status(200).send({
        message: "Logged in!",
        userInfo: results[0],
        accessToken: accessToken,
        refreshToken: refreshToken
      })
    } else {
      res.status(500).send({
        message: "Invalid username or password!"
      })
    }
  } catch (err) {
    console.log({err})
  }
}