const mysql = require("mysql")
const { dbConfig } = require("./config")

const db = mysql.createPool(dbConfig)

module.exports = (query) => {
   return new Promise((resolve, reject) => {
      db.getConnection((err, conn) => {
         if (err) {
            console.log("db error: ", err)
            reject(err)
         } else {
            conn.query(query, (err, results) => {
               if (err) {
                  console.log("query error: ", err)
                  reject(err)
               } else {
                  resolve(results)
               }
            })

            conn.release()
         }
      })
   })
}