import { useEffect, useState } from "react";
import api from "../services/api";
import AddTodo from "./AddTodo";
import DeleteTodo from "./DeleteTodo";
import UpdateTodo from "./UpdateTodo";

function TodoList({ isAdmin }) {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    api
      .get("/todos")
      .then((response) => setTodos(response.data))
      .catch((error) => console.error("Erro ao buscar tarefas:", error));
  }, []);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "done") return todo.done;
    if (filter === "pending") return !todo.done;
    return true;
  });

  return (
    <div className="todo-container">
      <h2 className="todo-title">📋 Lista de Tarefas</h2>

      <AddTodo onAdd={setTodos} />

      <div className="filters">
        <button
          className={`btn ${filter === "all" ? "btn-blue" : "btn-gray"}`}
          onClick={() => setFilter("all")}
        >
          Todas
        </button>
        <button
          className={`btn ${filter === "pending" ? "btn-blue" : "btn-gray"}`}
          onClick={() => setFilter("pending")}
        >
          Pendentes
        </button>
        <button
          className={`btn ${filter === "done" ? "btn-blue" : "btn-gray"}`}
          onClick={() => setFilter("done")}
        >
          Concluídas
        </button>
      </div>

      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <div className="todo-info">
              <h3 className={`todo-name ${todo.done ? "done" : ""}`}>
                {todo.name}
              </h3>
              <p className="todo-desc">{todo.description || "Sem descrição"}</p>
              <span className="todo-priority">
                Prioridade: {todo.priority}
              </span>
            </div>

            <div className="todo-actions">
              <UpdateTodo todo={todo} onUpdate={setTodos} />
              {isAdmin && <DeleteTodo id={todo.id} onDelete={setTodos} />}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;