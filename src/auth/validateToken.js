const { verify } = require("jsonwebtoken")

module.exports = (req, res, next) => {
  let token = req.get("authorization")
  if (token) {
    token = token.slice(7)
    verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        res.json({
          success: false,
          message: "Invalid token!"
        })
      } else {
        req.user = user
        next()
      }
    })
  } else {
    res.json({
      success: false,
      message: "Unauthorized access!"
    })
  }
}