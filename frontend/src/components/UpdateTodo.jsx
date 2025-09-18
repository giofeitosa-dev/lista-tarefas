import { useState } from "react";
import api from "../services/api";


function UpdateTodo({ todo, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState({ ...todo });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTodo({ ...editedTodo, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await api.put("", editedTodo);
      onUpdate(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  };

  return (
    <div>
      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            name="name"
            value={editedTodo.name}
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="description"
            value={editedTodo.description}
            onChange={handleChange}
            className="input"
          />
          <input
            type="number"
            name="priority"
            value={editedTodo.priority}
            onChange={handleChange}
            className="input small-input"
          />

          <div className="form-actions">
            <button onClick={handleSave} className="btn btn-green">
              Salvar
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="btn btn-gray"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="btn btn-yellow"
        >
          Editar
        </button>
      )}
    </div>
  );
}

export default UpdateTodo;
