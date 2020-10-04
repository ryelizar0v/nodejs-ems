const { verifyRole, verifyDept } = require("../services/verifyService")

module.exports = {
  createPermission: (userRole, userDept, employeeRole, employeeDept) => {
    switch (userRole) {
      case 1: return false
      case 2: {
        if (userRole < employeeRole) return false
        else if (userDept === employeeDept) return true
        else return false
      }
      case 3: return true
      default: return false
    }
  },
  deletePermission: async (userData, employeeId) => {
    try {
      const { currentUserId, currentUserRoleId, currentUserDeptId } = userData
      const { role_id } = await verifyRole(employeeId)
      const { dept_id } = await verifyDept(employeeId)
      switch (currentUserRoleId) {
        case 1: return false
        case 2: {
          if (currentUserId === employeeId) return false
          if (currentUserRoleId < role_id) return false
          else if (currentUserDeptId === dept_id) return true
          else return false
        }
        case 3: {
          if (currentUserId === employeeId) return false
          else return true
        }
        default: return false
      }
    } catch (err) {
      console.log("Error at /auth/checkPermission.js (deletePermission)")
      console.log(err)
    }
  }
}