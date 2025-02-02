 let express = require("express");
 const app = express();
 const mysql = require("mysql2");
 const path = require("path");
 var methodOverride = require('method-override');

 app.use(express.urlencoded({ extended: true }));
 app.use(methodOverride('_method'));
 app.use(express.static(path.join(__dirname, "public")));
 


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));




 const connection = mysql.createConnection({
    host:"localhost",
    user: "root",
    database:"node",
    password:"Harsh.0027"
  })

 app.get("/",(req,res)=>{

    let query = "select count(*) as count from table1  ";
    

        connection.query(query, (error, results) => {
            if (error) {
                console.error("Error executing query:", error);
                return res.status(500).send("Database query error");  
            }                    
            
            let count = results[0]['count'];
            console.log(count);
            res.render("home.ejs",{count});
        });
   
    
 });


 app.get("/show",(req,res)=>{

    let query = "select *  from table1  ";
    

        connection.query(query, (error, results) => {
            if (error) {
                console.error("Error executing query:", error);
                return res.status(500).send("Database query error");  
            }                    
            
            
            res.render("users.ejs",{results});
        });
   
    
 });
 app.get("/show/:id/edit",(req,res)=>{

    let {id} = req.params;
    let query = `select *  from table1 where id = ${id} `;
    

        connection.query(query, (error, results) => {
            if (error) {
                console.error("Error executing query:", error);
                return res.status(500).send("Database query error");  
            }        
            let user = results[0];            
            res.render("edit.ejs",{user});   
        });
   
    
 });

 app.patch("/show/:id",(req,res)=>{
   console.log(req.body);
   let inputpassword = req.body.form_password;
   let inputusername = req.body.form_username;
      
    let {id} = req.params;


    let query = `select password  from table1 where id = ${id} `;
    

        connection.query(query, (error, results) => {
            if (error) {
                console.error("Error executing query:", error);
                return res.status(500).send("Database query error");  
            }        
                  if(results[0]['password'] == inputpassword)
                    {
                        let query2 = `update table1 set username = '${inputusername}' where id = ${id}`;
                        connection.query(query2, (error, results) => {
                            if (error) {
                                console.error("Error executing query:", error);
                                return res.status(500).send("Database query error");  
                            }                    
                            res.redirect("/show");    
                        });
                    
                  }
                  else{
                    res.send(" wrong password"); 
                  }      
              
        });

    
 });


 app.get("/Add",(req,res)=>{
    res.render("Add.ejs");
 });

 app.post("/show",(req,res)=>{
    let {input_id, input_username, input_email, input_pass} = req.body;
    let query = "Insert into table1 (id, username, email, password) VALUES (?, ?, ?, ?)";
    let array = [input_id, input_username, input_email, input_pass];

    
    connection.query(query,array, (error, results) => {
        if (error) {
            console.error("Error executing query:", error);
            return res.status(500).send("Database query error");  
        } 
        res.redirect("/show");       
          
    });
    
 })

 app.delete("/show/:id",(req,res)=>{
    let {id} = req.params;

    let query = `delete from table1 where id = ${id}`;
    connection.query(query, (error, results) => {
        if (error) {
            console.error("Error executing query:", error);
            return res.status(500).send("Database query error");  
        } 
        res.redirect("/show");       
          
    });

 });

 app.get("/delete",(req,res)=>{
    res.render("delete.ejs");
 })
 app.delete("/show", (req, res) => {
    let id = req.body.input_id;
    let email= req.body.input_email;
    let query = `DELETE FROM table1 WHERE (email = '${email}') and  (id = ${id})`;

    connection.query(query, (error, results) => {
        if (error) {
            console.error("Error executing query:", error);
            return res.status(500).send("Database query error");
        }
        res.redirect("/show");
    });
});



 


 app.listen(3000,()=>{
    console.log("app is listening");

 })