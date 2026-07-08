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
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Tarefas", description = "Gerenciamento de tarefas do usuário autenticado") // ← adiciona antes do @RestController
@RestController
@RequestMapping("/todos")
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }
    
    @Operation(summary = "Criar tarefa", description = "Cria uma nova tarefa associada ao usuário logado")
    @PostMapping
    List<Todo> create(@RequestBody Todo todo,
                      @AuthenticationPrincipal UserDetails userDetails) {
        return todoService.create(todo, userDetails.getUsername());
    }

    @Operation(summary = "Listar tarefas", description = "Retorna todas as tarefas do usuário logado")
    @GetMapping
    List<Todo> list(@AuthenticationPrincipal UserDetails userDetails) {
        return todoService.list(userDetails.getUsername());
    }

    @Operation(summary = "Atualizar tarefa", description = "Atualiza uma tarefa existente do usuário logado")
    @PutMapping
    List<Todo> update(@RequestBody Todo todo,
                      @AuthenticationPrincipal UserDetails userDetails) {
        return todoService.update(todo, userDetails.getUsername());
    }

    @Operation(summary = "Excluir tarefa", description = "Exclui uma tarefa do usuário logado")
    @DeleteMapping("{id}")
    List<Todo> delete(@PathVariable("id") Long id,
                      @AuthenticationPrincipal UserDetails userDetails) {
        return todoService.delete(id, userDetails.getUsername());
    }
}