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

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`
  )});