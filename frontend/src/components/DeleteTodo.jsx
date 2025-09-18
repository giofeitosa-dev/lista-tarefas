import api from "../services/api";


function DeleteTodo({ id, onDelete }) {
  const handleDelete = async () => {
    try {
      const response = await api.delete(`/${id}`);
      onDelete(response.data);
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  };

  return (
    <button onClick={handleDelete} className="btn btn-red">
      Excluir
    </button>
  );
}

export default DeleteTodo;
