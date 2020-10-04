const conn = require("../database/connection")

module.exports = async (role, dept) => {
  try {
    let query = ``
    switch (role) {
      case 1: query = `SELECT first_name, middle_name, last_name, dept_name, role_description FROM personal_info ` +
        `WHERE personal_info.dept_id = '${dept}'`
        break
      case 2: query = `SELECT * FROM personal_info WHERE personal_info.dept_id = '${dept}'`
        break
      case 3: query = `SELECT * FROM employment_info`
        break
      default: return false
    }
    const results = await conn(query)
    return results
  } catch (err) {
    console.log(err)
    return false
  }
}