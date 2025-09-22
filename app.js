const express = require("express");
const users = require("./users");
const { validateUserId, validateEmail } = require("./middleware");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", validateUserId, (req, res) => {
  const userId = Number(req.params.id);
  const user = users.find(u => u.id === userId);
  if (!user) return res.status(404).json({ error: "کاربر پیدا نشد" });
  res.json(user);
});

app.post("/users/email", validateEmail, (req, res) => {
  const email = req.body.email;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(404).json({ error: "کاربر پیدا نشد" });
  res.json(user);
});

app.post("/users/name", (req, res) => {
  const name = req.body.name;
  const user = users.find(u => u.name === name);
  if (!user) return res.status(404).json({ error: "کاربر پیدا نشد" });
  res.json(user);
});

app.post("/users", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "نام و ایمیل الزامی است" });
  }
  const newId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
  const newUser = { id: newId, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.put("/users/:id", validateUserId, (req, res) => {
  const userId = Number(req.params.id);
  const { name, email } = req.body;
  const user = users.find(u => u.id === userId);
  if (!user) return res.status(404).json({ error: "کاربر پیدا نشد" });
  if (name) user.name = name;
  if (email) user.email = email;
  res.json(user);
});

app.delete("/users/:id", validateUserId, (req, res) => {
  const userId = Number(req.params.id);
  const idx = users.findIndex(u => u.id === userId);
  if (idx === -1) return res.status(404).json({ error: "کاربر پیدا نشد" });
  const removed = users.splice(idx, 1)[0];
  res.json({ message: "کاربر حذف شد", user: removed });
})
app.listen(PORT, () => {
  console.log("✅ Server is running on http://localhost:${PORT}");
});