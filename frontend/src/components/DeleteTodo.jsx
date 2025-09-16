import api from "../services/api";

function DeleteTodo({id, onDelete}) {
    const handleDelete = async() => {
        try {
            const response = await api.delete(`/${id}`);
            onDelete(response.data);
        }catch (error){
            console.error("Não foi possível deletar tarefa:", error);
        }
    };
    
  return (
    <button onClick={handleDelete}>
        Excluir
    </button>
  );
}

export default DeleteTodo
