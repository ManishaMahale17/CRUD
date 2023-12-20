const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql= require('mysql2');

const db=mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'crud'
})
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get",(req,res) =>{
    const sqlGet="SELECT * FROM emp";
    db.query(sqlGet,(error,result)=>{
        res.send(result);
    });
})

app.post('/api/post',(req,res)=>{
    const {name,email,contact} =req.body;
    const sqlInsert = "INSERT INTO emp (name,email,contact) VALUES (?,?,?)";
    db.query(sqlInsert, [name,email,contact],(error,result) =>{
        if(error){
            console.log(error);
        }
    });
})
app.get("/",(req, res) =>{
    // const sqlInsert =
    // "INSERT INTO emp (name,email,contact) VALUES ('Sweety','sweety@gmail.com',7888888)";
    // db.query(sqlInsert,(error,result)=>{
    //     console.log("error" ,error);
    //     console.log("result",result);
    //     res.send("Hello express")
    // })
     
})

app.delete('/api/remove/:id',(req,res)=>{
    const {id} =req.params;
    const sqlRemove = "DELETE FROM emp WHERE id=?";
    db.query(sqlRemove, id,(error,result) =>{
        if(error){
            console.log(error);
        }
    });
})

app.get("/api/get/:id",(req,res) =>{
    const {id} = req.params;
    const sqlGet="SELECT * FROM emp WHERE id =?";
    db.query(sqlGet,id,(error,result)=>{
        if(error){
            console.log(error);
        }
        res.send(result);
    });
})

app.put("/api/update/:id",(req,res) =>{
    const {id} = req.params;
    const{name,email,contact}=req.body;
    const sqlUpdate="UPDATE emp SET name=?,email=?,contact=? WHERE id=?";
    db.query(sqlUpdate, [name,email,contact,id],(error,result)=>{
        if(error){
            console.log(error);
        }
        res.send(result);
    });
})

app.listen(5000,()=>{
    console.log('listening on port 5000');
})