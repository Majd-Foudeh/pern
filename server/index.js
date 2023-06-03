const express = require('express')
const cors = require('cors')

const app = express()
const pool = require('./db')

// middleware 
app.use(cors())
app.use(express.json())

// Routes


// create a todo
app.post("/todos", async (req, res) => {
    try {

        const { description } = req.body;
        const query=`
        INSERT INTO todo (description) VALUES($1) RETURNING *
        `
        const newtodo = await pool.query(query, [description])
        res.json(newtodo)
}
    catch (err) {
        console.error(err.message);
    }
})
 
// get todo
app.get("/todos" , async(req,res)=>{
try{

const alltodos = await pool.query("SELECT * FROM todo")
res.json(alltodos)
}
catch(err){
    console.error(err.message);
}

})

app.get("/todos/:id" , async (req,res)=>{
    try{

const {id} =req.params;
const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])
res.json(todo)

    }
    catch(err){
        console.error(err.message);
    }
})


// update a todo
app.put("/todos/:id",async (req,res)=>{
    try{
    const {id} = req.params;
    const {description}=req.body;

    const edittodo= await pool.query("UPDATE todo SET description =$1 WHERE todo_id=$2",[description,id])
    res.json('todo updated successfuly')
}
catch(err){
    console.error(err.message);
}
})

// delete a todo
app.delete("/todos/:id", async(req,res) => {
    try{
const {id} = req.params;
const deletetodo = await pool.query(" DELETE FROM todo WHERE todo_id = $1",[id])
res.json('todo was deleted successfully')
    }
    catch(err){
        console.error(err.message);
    }
})


app.listen(5000, () => {
    console.log('server started on port 5000');
})