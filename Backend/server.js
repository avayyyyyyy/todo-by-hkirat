const express = require("express");
const app = express();
const { createTodo, updateTodo } = require("./types");
const todos = require("./models");

app.use(express.json());

app.get("/todos", async (req, res) => {
  try {
    let data = await todos.find();
    res.json(data);
  } catch {
    res.json({ err: "Error occured in fetching Data" });
  }
});

app.post("/todos", async (req, res) => {
  let userBody = req.body;
  console.log(userBody);
  let validBody = createTodo.safeParse(userBody);
  if (!validBody.success) {
    res.status(411).json({
      msg: "You sent the wrong inputs",
    });
    return;
  }
  let inserted = await todos.create({
    title: userBody.title,
    description: userBody.description,
    completed: false,
  });

  res.json({ msg: "Todos Created!", inserted });
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
  res.json({ msg: "Completed !" });
});

app.listen(3000, () => {
  console.log("Server started on localhost://3000");
});
