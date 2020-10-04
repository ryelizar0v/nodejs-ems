const conn = require("../database/connection")

module.exports = async (data) => {
  try {
    const { username, password } = data
    const query = `SELECT * FROM employees WHERE username = '${username}'`
    const result = await conn(query)

    if (result.length) return result[0].password === password ? result : false
    else return false
  } catch (err) {
    console.log(err)
    return false
  }
}