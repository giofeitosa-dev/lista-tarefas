package com.br.todolist.lista_tarefas.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.br.todolist.lista_tarefas.entity.Todo;

public interface TodoRepository extends JpaRepository <Todo, Long>{
  
    
}
