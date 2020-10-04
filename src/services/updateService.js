const dbConn = require("../database/connection")
const { verifyDept } = require("../services/verifyService")

module.exports = async (data, userId, userRole, userDept, employeeRole) => {
  try {
    let query = ``
    switch (userRole) {
      // position: staff
      case 1: {
        // check if self
        if (data.employeeId === userId) {
          const { employeeId, username, password, emailAddress, contactNo } = data
          query = `UPDATE account_info SET username = '${username}', password = '${password}', ` +
            `email_address = '${emailAddress}', contact_no = '${contactNo}' ` +
            `WHERE account_info.employee_id = '${employeeId}' `
        } else return false
        break
      }
      // position: department head
      case 2: {
        const { dept_id } = await verifyDept(data.employeeId)
        // if self, allow updating account info only
        if (data.employeeId === userId) {
          if (userRole < employeeRole) return false
          else {
            const { employeeId, username, password, emailAddress, contactNo } = data
            query = `UPDATE account_info SET username = '${username}', password = '${password}', ` +
              `email_address = '${emailAddress}', contact_no = '${contactNo}' ` +
              `WHERE account_info.employee_id = '${employeeId}' `
          }
        } else {
          // do not permit updating employee from other department
          if (userDept !== dept_id) return false
          // do not permit updating employee to higher position
          else if (userRole < employeeRole) return false
          else {
            const { employeeId, firstName, middleName, lastName, gender,
              dateOfBirth, homeAddress, emailAddress, contactNo, jobDescription, roleId } = data
            query = `UPDATE employees SET first_name = '${firstName}', middle_name = '${middleName}', ` +
              `last_name = '${lastName}', gender = '${gender}', date_of_birth = '${dateOfBirth}', ` +
              `home_address = '${homeAddress}', email_address = '${emailAddress}', contact_no = '${contactNo}', ` +
              `job_description = '${jobDescription}', role_id = '${roleId}' ` +
              `WHERE employees.employee_id = '${employeeId}' `
          }
        }
        break
      }
      // position: company admin
      case 3: {
        const { employeeId, firstName, middleName, lastName, gender, dateOfBirth, homeAddress, 
          emailAddress, contactNo, jobDescription, salary, employmentType, roleId, deptId } = data
          query = `UPDATE employees SET first_name = '${firstName}', middle_name = '${middleName}', ` +
          `last_name = '${lastName}', gender = '${gender}', date_of_birth = '${dateOfBirth}', home_address = '${homeAddress}', ` +
          `email_address = '${emailAddress}', contact_no = '${contactNo}', job_description = '${jobDescription}', ` +
          `salary = '${salary}', employment_type = '${employmentType}', role_id = '${roleId}', dept_id = '${deptId}' ` +
          `WHERE employees.employee_id = '${employeeId}' `
        break
      }
      default: return false
    }

    const result = await dbConn(query)
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}