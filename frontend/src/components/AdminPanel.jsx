import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminPanel({ onClose }) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/api/admin/users")
      .then((response) => setUsers(response.data))
      .catch(() => setError("Erro ao carregar usuários."));
  }, []);

  async function handleDelete(id) {
    try {
      const response = await api.delete(`/api/admin/users/${id}`);
      setUsers(response.data);
    } catch (err) {
      setError("Erro ao excluir usuário.");
    }
  }

  return (
    <div className="todo-container" style={{ maxWidth: 700 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 className="todo-title" style={{ margin: 0 }}>👥 Gerenciar Usuários</h2>
        <button onClick={onClose} className="btn btn-gray">
          Voltar
        </button>
      </div>

      {error && <p style={{ color: "#dc2626" }}>{error}</p>}

      <ul className="todo-list">
        {users.map((user) => (
          <li key={user.id} className="todo-item">
            <div className="todo-info">
              <h3 className="todo-name">{user.username}</h3>
              <span className="todo-priority">{user.role}</span>
            </div>
            <div className="todo-actions">
              <button
                onClick={() => handleDelete(user.id)}
                className="btn btn-red"
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}