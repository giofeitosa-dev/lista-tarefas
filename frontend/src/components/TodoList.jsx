import { useEffect, useState } from "react";
import api from "../services/api";

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    api.get("/")
      .then(response => setTodos(response.data))
      .catch(error => console.error("Erro ao buscar tarefas:", error));
  }, []);

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.name} - {todo.done ? "✅" : "❌"}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
