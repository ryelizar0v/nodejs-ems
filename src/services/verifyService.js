const dbConn = require("../database/connection")

module.exports = {
  verifyRole: async (employeeId) => {
    try {
      const query = `SELECT role_id from employees WHERE employees.employee_id = '${employeeId}' `
      const result = await dbConn(query)
      return result[0]
    } catch (err) {
      console.log("Error at /services/verifyService.js (verifyRole)")
      return err
    }
  },
  verifyDept: async (employeeId) => {
    try {
      const query = `SELECT dept_id from employees WHERE employees.employee_id = '${employeeId}' `
      const result = await dbConn(query)
      return result[0]
    } catch (err) {
      console.log("Error at /services/verifyService.js (verifyDept)")
      return err
    }
  }
}