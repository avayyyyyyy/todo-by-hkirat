const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://Admin:admin@cluster0.itvhwu4.mongodb.net/TodoApp")
  .then(() => {
    console.log("DB Connected !");
  });

const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const todos = mongoose.model("hkirat-todos", todoSchema);

module.exports = todos;
