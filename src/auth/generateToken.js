require("dotenv").config()
const { sign } = require("jsonwebtoken")

module.exports = {
  generateAccessToken: userData => { 
    return sign(userData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION }) 
  },
  generateRefreshToken: userData => {
    return sign(userData, process.env.REFRESH_TOKEN_SECRET)
  }
}