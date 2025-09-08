const express = require("express");
const users = require("./users");
<<<<<<< HEAD
const validateUserId = require("./middleware");
const app = express();
app.use(express.json());
const PORT = 3000;
app.get("/users", (req, res) => {
  res.json(users);
});
app.get("/users/:id", validateUserId, (req, res) => {
=======
const middlewares = require("./middleware");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get("/users", (req, res) => {
  res.json(users);
});
app.get("/users/:id", middlewares.validateUserId, (req, res) => {
>>>>>>> 32f5ab665c13ed4c275e32afd4ba567d28b22e98
  const userId = Number(req.params.id);
  const user = users.find(u => u.id === userId);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

<<<<<<< HEAD
app.post("/users",(req,res)=>{
  const {name,email}=req.body;
  if(!name|| !email){
    return
    res.status(400).json(
      {errore:"name and email are required"}
    );
  }
  const newid = users.length ? 
  Math.max(...users.map(u => u.id)) +1 : 1;
  const newuser = {
    id: newid , name,email};

    users.push(newuser);
    res.status(201).json(newuser)
});

app.put("/users/:id",validateUserId,(req,res)=>{
  const userId=
  Number(req.params.id);
  const {name,email}=
  req.body;
  const user= users.find(u =>u.id === userid);
  if (!user) return
  res.status(400).json({
    error:"user not found" });
    if (name)user.name =name;
    if (email)user.email=email;
    res.json(user);
});

app.delete("/users/:id",validateUserId,(req,res)=>{
  const userid = number(req.params.id);
  const idx = users.findIndex(u=> u.id === userid);
  if (idx=== -1) return
  res.status(400).json({error:user ("not found")});
  const removed =users.splice(idx , 1)[0];
  res.json({message:"user deleted",user:removed});
  
  })

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`
  )});
  
app.get ("/"(req,res ) );
res.send ("server is running");
=======
app.post("/users/email", middlewares.validateEmail, (req, res) => {
  const email = req.body.email;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

app.post("/users/name", (req, res) => {
  const name = req.body.name;
  const user = users.find(u => u.name === name);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`
  )});
>>>>>>> 32f5ab665c13ed4c275e32afd4ba567d28b22e98
