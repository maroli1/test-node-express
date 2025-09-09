const express = require("express");
const users = require("./users");
const middlewares = require("./middleware");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get("/users", (req, res) => {
  res.json(users);
});
app.get("/users/:id", middlewares.validateUserId, (req, res) => {
  const userId = Number(req.params.id);
  const user = users.find(u => u.id === userId);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

app.post("/users/email", middlewares.validateEmail, (req, res) => {
  const email = req.body.email;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

app.post("/users/name", (req, res) => {
  const name = req.body.name;
  const user = users.find(u => u.name === name);
  if (!user) return res.status(404).json({ error: "User nott found" });
  res.json(user);
});

app.post("/users", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return
     res.status(400).json({ error: "name and email are required" });
  }
  const newId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
  const newUser =
   { id: newId, name, email };
 users.push(newUser);
 res.status(201).json(newUser);
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`
  )});
