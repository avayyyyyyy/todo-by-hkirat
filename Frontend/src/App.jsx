import { useEffect, useState } from "react";

const App = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title, description: desc }),
      });
      setTitle("");
      setDesc("");
      alert("Todo Submitted!");
    } catch (e) {
      console.log("Error AAgya ");
    }
  }

  let [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  });

  async function handleComplete(id) {
    await fetch("http://localhost:3000/completed", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit} method="post">
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="title"
        />
        <br />
        <input
          type="text"
          onChange={(e) => {
            setDesc(e.target.value);
          }}
          value={desc}
          name="description"
          placeholder="description"
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      <div>
        {todos.map((todo) => (
          <div key={todo._id}>
            <h3>{todo.title}</h3>
            <p>Description: {todo.description}</p>
            <button
              onClick={() => {
                handleComplete(todo._id);
              }}
            >
              Completed: {todo.completed ? "Yes" : "No"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
