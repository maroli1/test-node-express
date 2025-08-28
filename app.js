
const express = require ("express")
const users = require("./users");
const validateUserId = require("./middleware");
const app = express();
const PORT = 3000;
app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", validateUserId, (req, res) => {
  const userId = Number(req.params.id);
  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:$ {PORT}`)
});


