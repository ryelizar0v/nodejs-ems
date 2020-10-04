const dbConn = require("../database/connection")

module.exports =  {
  addToken: async (token) => {
    try {
      const query = `INSERT INTO tokens (token_value) VALUES ('${token}') `
      const result = await dbConn(query)
      return result
    } catch (err) {
      console.log("Error at /services/tokenService.js (addToken)")
    }
  },
  checkToken: async (token) => {
    try {
      const query = `SELECT * FROM tokens WHERE token_value = '${token}' `
      const result = await dbConn(query)
      return result
    } catch (err) {
      console.log("Error at /services/tokenService.js (checkToken)")
    }
  },
  deleteToken: async (token) => {
    try {
      const query = `DELETE FROM tokens WHERE token_value = '${token}' `
      const result = await dbConn(query)
      return result
    } catch (err) {
      console.log("Error at /service/tokenService.js (deleteToken)")
    }
  }
}