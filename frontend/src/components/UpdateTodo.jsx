import api from "../services/api";

function UpdateTodo({ todo, onUpdate }) {
  const toggleDone = async () => {
    try {
      const response = await api.put("", { ...todo, done: !todo.done });
      onUpdate(response.data);
    } catch (error) {
      console.error("Não foi possível atualizar tarefa", error);
    }
  };

  return (
    <button onClick={toggleDone}>{todo.done ? "Pendente" : "Concluída"}</button>
  );
}

export default UpdateTodo;
