const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL).then(() => {
  console.log("DB Connected !");
});

const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const todos = mongoose.model("hkirat-todos", todoSchema);

module.exports = todos;
