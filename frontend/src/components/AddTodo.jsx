import { useState } from "react";
import api from "../services/api";

function AddTodo({ onAdd }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("", {
        name,
        description,
        done: false,
        priority: 1
      });
      onAdd(response.data); 
      setDescription("");
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <input
        type="text"
        placeholder="Nome da tarefa"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input"
      />
      <input
        type="text"
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="input"
      />
      <input
        type="number"
        placeholder="Prioridade"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="input small-input"
      />
      <button type="submit" className="btn btn-blue">
        Adicionar
      </button>
    </form>
  );
}

export default AddTodo;
