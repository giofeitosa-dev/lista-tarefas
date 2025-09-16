import { useEffect, useState } from "react";
import api from "../services/api";
import AddTodo from "./AddTodo";
import DeleteTodo from "./DeleteTodo";

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    api
      .get("")
      .then((response) => setTodos(response.data))
      .catch((error) => console.error("Erro ao buscar tarefas:", error));
  }, []);

  return (
    <div>
      <h2> Lista de tarefas </h2>
      <AddTodo onAdd={setTodos} />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.name} - {todo.done ? "✅" : "❌"}
            <DeleteTodo id={todo.id} onDelete={setTodos} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
