const conn = require("../database/connection")

module.exports = async (employeeId) => {
  try {
    const query = `DELETE FROM employees WHERE employees.employee_id = '${employeeId}'`
    const result = await conn(query)
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}