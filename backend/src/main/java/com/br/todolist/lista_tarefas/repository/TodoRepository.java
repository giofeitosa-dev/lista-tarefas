package com.br.todolist.lista_tarefas.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import com.br.todolist.lista_tarefas.entity.Todo;
import com.br.todolist.lista_tarefas.entity.User;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findByOwner(User owner, Sort sort);
    Optional<Todo> findByIdAndOwner(Long id, User owner);
}