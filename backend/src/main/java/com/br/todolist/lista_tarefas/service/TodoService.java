package com.br.todolist.lista_tarefas.service;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.br.todolist.lista_tarefas.entity.Todo;
import com.br.todolist.lista_tarefas.entity.User;
import com.br.todolist.lista_tarefas.repository.TodoRepository;
import com.br.todolist.lista_tarefas.repository.UserRepository;

@Service
public class TodoService {

    private final TodoRepository todoRepository;
    private final UserRepository userRepository;

    public TodoService(TodoRepository todoRepository, UserRepository userRepository) {
        this.todoRepository = todoRepository;
        this.userRepository = userRepository;
    }

    private Sort defaultSort() {
        return Sort.by("priority").descending().and(Sort.by("name").ascending());
    }

    private User getUser(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado"));
    }

    public List<Todo> list(String username) {
        User owner = getUser(username);
        return todoRepository.findByOwner(owner, defaultSort());
    }

    public List<Todo> create(Todo todo, String username) {
        User owner = getUser(username);
        todo.setOwner(owner);
        todoRepository.save(todo);
        return list(username);
    }

    public List<Todo> update(Todo todo, String username) {
        User owner = getUser(username);
        // confirma que a tarefa pertence a quem está editando
        todoRepository.findByIdAndOwner(todo.getId(), owner)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN, "Sem permissão para editar esta tarefa"));
        todo.setOwner(owner);
        todoRepository.save(todo);
        return list(username);
    }

    public List<Todo> delete(Long id, String username) {
        User owner = getUser(username);
        // confirma que a tarefa pertence a quem está excluindo
        Todo todo = todoRepository.findByIdAndOwner(id, owner)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN, "Sem permissão para excluir esta tarefa"));
        todoRepository.delete(todo);
        return list(username);
    }
}