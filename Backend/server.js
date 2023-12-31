const express = require("express");
const zod = require("zod");
const app = express();
const { createTodo, updateTodo } = require("./types");
const { todos } = require("./models");

app.use(express.json());

app.get("/todos", async (req, res) => {
  try {
    let data = await todos.findAll();
    res.json(data);
  } catch {
    res.json({ err: "Error occured in fetching Data" });
  }
});

app.post("/todos", async (req, res) => {
  let userBody = req.body;
  let validBody = createTodo.safeParse(userBody);
  if (!validBody.success) {
    res.json({ err: "Invalid User Body" });
  } else {
    await todos.create({
      title: validBody.title,
      description: validBody.description,
      completed: { default: false },
    });
  }
});

app.put("/completed", async (req, res) => {
  let userBody = req.body;
  let validBody = updateTodo.safeParse(userBody);
  if (!validBody.success) {
    res.json({ err: "Invalid User Body" });
  } else {
    let user_id = req.body.id;
    await todos.findByIdAndUpdate(user_id, { completed: true });
  }
});

app.listen(3000, () => {
  console.log("Server started on localhost://3000");
});
