const sql = require('../config/database')

module.exports = {
   active:(data,result)=>{
       console.log(data.status)
    sql.query(
        "UPDATE users SET status = ? WHERE usrId = ?",
        [data.status,data.usrId],
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(err);
            
          }
    
          if (res.affectedRows == 0) {
            // not found Customer with the id
            result(null, "not found" );
            
          }
    
        
          result(null, "updated");
        })
   },
    getAll: (result)=>{
        sql.query("SELECT * FROM users", (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(err);
              return;
            }
        
            console.log("customers: ", res);
            result(null, res);
          });
    },
    getAllById: (id,result)=>{
        sql.query("SELECT * FROM users where usrId = ?",id, (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(err);
              return;
            }
        
            console.log("customers: ", res[0]);
            result(null, res);
          });
    },
    create: (data,result)=>{
        
        const dat =function() {
            this.email = data.email;
            this.password = data.password
          }
        sql.query("INSERT INTO users SET ?",data, (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(err);
              return; 
            }
        
            console.log("customers: ", res);
            result(null, res);
          });
    },
    deleteByID: (id,result)=>{
        sql.query("DELETE FROM users where id = ?",id, (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(err);
              return;
            }
        
            console.log("customers: ", res);
            result(null, res);
          });
    },
    login:(data,result)=>{
        sql.query("SELECT * FROM users where email = ?",data.email, (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(err);
              return;
            }
        
            console.log("customers: ", res);
            result(null, res[0 ]);
          });
    },
    getLastUserId:(result)=>{
        sql.query("SELECT * FROM users ORDER BY id DESC LIMIT 1 ", (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(err);
              return;
            }
        
            console.log("customers: ", res);
            if(res.length == 1)
            result(null, res[0]);
            else
            result(null, "data was empty");
          });
    },
    dublicateUser:(data,result)=>{
        
        sql.query("SELECT * FROM users Where email = ? OR phone = ?",[data.email,data.phone], (err, res) => {
            if (err) {
              console.log("error: ", err);
              
              return result(err);
            }
           console.log(res)
          
            result(null, res);
          
          });
    },
 checkUser:(data,result)=>{
        
        sql.query("SELECT * FROM users Where email = ? ",data.email, (err, res) => {
            if (err) {
              console.log("error: ", err);
              
              return result(err);
            }
           console.log(res)
          if(res.length == 1)
            result(null, res[0]);
          
          });
    },
    updateById :(id, data ,result) => {
        sql.query(
          "UPDATE users SET password = ? WHERE usrId = ?",
          [data.password, id],
          (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(err);
              
            }
      
            if (res.affectedRows == 0) {
              // not found Customer with the id
              result(null, "not found" );
              
            }
      
          
            result(null, "updated");
          }
        );
      }

}