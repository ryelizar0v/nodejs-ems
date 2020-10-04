# nodejs-ems
 
Exam code: Simple employee management system emulation using Node.js

## Initialization

* Install necessary packages
* Create database (structure provided in `nodejs-ems.sql` file)

## API routes

### /auth/login

* User log in
* Success: JSON object containing employee info `employee`, access token `accessToken`, and refresh token `refreshToken`
* `refreshToken` is saved in `tokens` table in mysql database
* Restriction: Account must be created first by an existing employee

**Usage**
Request body format:
```json
{
  "username": "USERNAME",
  "password": "PASSWORD"
}
```

### /auth/token

* Generate new access token after expiry using refresh token
* Success: New access token `accessToken`

**Usage**
Request body format:
```json
{
  "token": "REFRESH_TOKEN_SECRET"
}
```

### /auth/logout

* User log out
* Success: Delete `refreshToken` from database

**Usage**
Request body format:
```json
{
  "token": "REFRESH_TOKEN_SECRET"
}
```

### /employee

* View employee info
* Success: JSON object containing employee info
* Restrictions
  * `Role 1` (staff level) can only view limited info of employees from same department: `first_name`, `middle_name`, `last_name`, `dept_name`, and `role_description`
  * `Role 2` (department level) can view info of employees from same department only, except `username` and `password`
  * `Role 3` (company level) can view info of any employee, except `username` and `password`

**Usage**
Request header must contain fresh and valid `accessToken`

### /employee/create

* Add employee entry
* Restrictions
  * `Role 1` cannot add employee entry
  * `Role 2` cannot add employee outside own department or employee with higher role

**Usage**
Request body format:
```json
{ 
  "firstName": "FIRST_NAME", 
  "middleName": "MIDDLE_NAME", 
  "lastName": "LAST_NAME", 
  "gender": "GENDER", /* Male, Female, Other */
  "dateOfBirth": "2020-10-04",
  "homeAddress": "ADDRESS",
  "emailAddress": "email@company.com",
  "contactNo": "09123456789",
  "jobDescription": "JOB_DESCRIPTION",
  "salary": "16000.00",
  "employmentType": "EMPLOYMENT_TYPE", /* Full time, Part time, Job contract */
  "username": "USERNAME", 
  "password": "PASSWORD", 
  "roleId": 3, /* 1, 2, 3 */
  "deptId": 1 /* 1, 2, 3 */
}
```

### /employee/update

* Update employee entry
* Restrictions
  * `Role 1` can only edit own info limited to `username`, `password`, `email_address`, and `contact_no`
  * `Role 1` cannot edit info of other employee
  * `Role 2` can edit own info limited to `username`, `password`, `email_address`, and `contact_no`
  * `Role 2` can edit info of employee from own department, except `username`, `password`, `salary` and `employment_type`
  * `Role 2` cannot move an employee to another department or a role higher than his/her role

**Usage**
Request body format:
```json
{ 
  "employeeId": 1,
  "firstName": "FIRST_NAME", 
  "middleName": "MIDDLE_NAME", 
  "lastName": "LAST_NAME", 
  "gender": "GENDER", /* Male, Female, Other */
  "dateOfBirth": "2020-10-04",
  "homeAddress": "ADDRESS",
  "emailAddress": "email@company.com",
  "contactNo": "09123456789",
  "jobDescription": "JOB_DESCRIPTION",
  "salary": "16000.00",
  "employmentType": "EMPLOYMENT_TYPE", /* Full time, Part time, Job contract */
  "username": "USERNAME", 
  "password": "PASSWORD", 
  "roleId": 3, /* 1, 2, 3 */
  "deptId": 1 /* 1, 2, 3 */
}
```

**Note:** Some fields will not be updated based on role restriction even if value is provided

### /employee/delete

* Delete employee entry
* Restrictions
  * `Role 1` cannot delete any entry
  * `Role 2` can delete any entry from same department, except own
  * `Role 3` can delete any entry, except self

**Usage**
Request body format:
```json
{
  "employeeId": 1
}
```