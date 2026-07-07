package com.br.todolist.lista_tarefas.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.br.todolist.lista_tarefas.entity.User;
import com.br.todolist.lista_tarefas.repository.TodoRepository;
import com.br.todolist.lista_tarefas.repository.UserRepository;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final TodoRepository todoRepository;

    public AdminService(UserRepository userRepository, TodoRepository todoRepository) {
        this.userRepository = userRepository;
        this.todoRepository = todoRepository;
    }

    public List<User> listUsers() {
        return userRepository.findAll();
    }

    public List<User> deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado"));
        
        todoRepository.deleteAll(todoRepository.findByOwner(user,
            org.springframework.data.domain.Sort.unsorted()));
        
        userRepository.delete(user);
        return userRepository.findAll();
    }
}