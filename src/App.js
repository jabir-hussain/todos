import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import { useQuery } from "react-query";

if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  worker.start();
}

function App() {
  const { data: todos, isLoading } = useQuery("todos", () => {
    return fetch("/todos")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("data", data);
        return data;
      });
  });

  if (isLoading) return <div>Loading....</div>;

  return (
    <ul className="App">
      {todos.map((todo) => {
        return <li key={todo.id}>{todo.title}</li>;
      })}
    </ul>
  );
}

export default App;
