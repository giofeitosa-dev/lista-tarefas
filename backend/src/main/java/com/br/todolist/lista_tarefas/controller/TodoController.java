package com.br.todolist.lista_tarefas.controller;

import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.br.todolist.lista_tarefas.entity.Todo;
import com.br.todolist.lista_tarefas.service.TodoService;

@RestController
@RequestMapping("/todos")
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @PostMapping
    List<Todo> create(@RequestBody Todo todo,
                      @AuthenticationPrincipal UserDetails userDetails) {
        return todoService.create(todo, userDetails.getUsername());
    }

    @GetMapping
    List<Todo> list(@AuthenticationPrincipal UserDetails userDetails) {
        return todoService.list(userDetails.getUsername());
    }

    @PutMapping
    List<Todo> update(@RequestBody Todo todo,
                      @AuthenticationPrincipal UserDetails userDetails) {
        return todoService.update(todo, userDetails.getUsername());
    }

    @DeleteMapping("{id}")
    List<Todo> delete(@PathVariable("id") Long id,
                      @AuthenticationPrincipal UserDetails userDetails) {
        return todoService.delete(id, userDetails.getUsername());
    }
}