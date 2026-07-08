package com.br.todolist.lista_tarefas.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.br.todolist.lista_tarefas.entity.User;
import com.br.todolist.lista_tarefas.service.AdminService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Admin", description = "Operações restritas a usuários com papel ADMIN")
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @Operation(summary = "Listar usuários", description = "Retorna todos os usuários cadastrados")
    @GetMapping("/users")
    public ResponseEntity<List<User>> listUsers() {
        return ResponseEntity.ok(adminService.listUsers());
    }

    @Operation(summary = "Excluir usuário", description = "Remove um usuário e todas as suas tarefas")
    @DeleteMapping("/users/{id}")
    public ResponseEntity<List<User>> deleteUser(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.deleteUser(id));
    }
}