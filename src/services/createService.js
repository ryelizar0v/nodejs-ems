const conn = require("../database/connection")

module.exports = async (data) => {
  
  try {
    const { 
      firstName, 
      middleName, 
      lastName, 
      gender,
      dateOfBirth,
      homeAddress,
      emailAddress,
      contactNo,
      jobDescription,
      salary,
      employmentType,
      username, 
      password, 
      roleId,
      deptId
    } = data
    const query = `INSERT INTO employees (first_name, middle_name, last_name, gender, date_of_birth, ` +
      `home_address, email_address, contact_no, job_description, salary, employment_type, username, password, role_id, dept_id) ` +
      `VALUES ('${firstName}', '${middleName}', '${lastName}', '${gender}', '${dateOfBirth}', '${homeAddress}', ` +
      `'${emailAddress}', '${contactNo}', '${jobDescription}', '${salary}', '${employmentType}', '${username}', '${password}', '${roleId}', '${deptId}')`

    const result = await conn(query)
    return result
  } catch (err) {
    console.log(err)
    return false
  }
}