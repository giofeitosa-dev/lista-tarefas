package com.br.todolist.lista_tarefas.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Sort;
import org.springframework.web.server.ResponseStatusException;

import com.br.todolist.lista_tarefas.entity.Role;
import com.br.todolist.lista_tarefas.entity.Todo;
import com.br.todolist.lista_tarefas.entity.User;
import com.br.todolist.lista_tarefas.repository.TodoRepository;
import com.br.todolist.lista_tarefas.repository.UserRepository;

@ExtendWith(MockitoExtension.class) 
class TodoServiceTest {

    @Mock
    private TodoRepository todoRepository; 

    @Mock
    private UserRepository userRepository; 

    @InjectMocks
    private TodoService todoService; 

    private User user;
    private Todo todo;

    @BeforeEach 
    void setUp() {
        user = new User();
        user.setId(1L);
        user.setUsername("joao");
        user.setRole(Role.USER);

        todo = new Todo();
        todo.setId(1L);
        todo.setName("Estudar testes");
        todo.setDescription("JUnit e Mockito");
        todo.setPriority(1);
        todo.setDone(false);
        todo.setOwner(user);
    }

    // ===================== list() =====================

    @Test
    @DisplayName("Deve retornar lista de tarefas do usuário logado")
    void list_deveRetornarTarefasDoUsuario() {
        
        when(userRepository.findByUsername("joao")).thenReturn(Optional.of(user));
        when(todoRepository.findByOwner(eq(user), any(Sort.class))).thenReturn(List.of(todo));

        
        List<Todo> result = todoService.list("joao");

        
        assertEquals(1, result.size());
        assertEquals("Estudar testes", result.get(0).getName());
    }

    @Test
    @DisplayName("Deve lançar exceção quando usuário não existe ao listar")
    void list_deveLancarExcecaoQuandoUsuarioNaoExiste() {
        
        when(userRepository.findByUsername("inexistente")).thenReturn(Optional.empty());

        
        assertThrows(ResponseStatusException.class, () -> todoService.list("inexistente"));
    }

    // ===================== create() =====================

    @Test
    @DisplayName("Deve criar tarefa e associar ao usuário logado")
    void create_deveCriarTarefaComOwnerCorreto() {
        
        Todo novaTarefa = new Todo();
        novaTarefa.setName("Nova tarefa");
        novaTarefa.setPriority(2);

        when(userRepository.findByUsername("joao")).thenReturn(Optional.of(user));
        when(todoRepository.save(any(Todo.class))).thenReturn(novaTarefa);
        when(todoRepository.findByOwner(eq(user), any(Sort.class))).thenReturn(List.of(novaTarefa));

        
        List<Todo> result = todoService.create(novaTarefa, "joao");

       
        verify(todoRepository).save(novaTarefa); 
        assertEquals(novaTarefa.getOwner(), user); 
        assertEquals(1, result.size());
    }

    // ===================== update() =====================

    @Test
    @DisplayName("Deve atualizar tarefa quando pertence ao usuário")
    void update_deveAtualizarQuandoTarefaPertenceAoUsuario() {
        
        when(userRepository.findByUsername("joao")).thenReturn(Optional.of(user));
        when(todoRepository.findByIdAndOwner(1L, user)).thenReturn(Optional.of(todo));
        when(todoRepository.save(any(Todo.class))).thenReturn(todo);
        when(todoRepository.findByOwner(eq(user), any(Sort.class))).thenReturn(List.of(todo));

        
        List<Todo> result = todoService.update(todo, "joao");

        
        verify(todoRepository).save(todo);
        assertEquals(1, result.size());
    }

    @Test
    @DisplayName("Deve lançar exceção ao tentar editar tarefa de outro usuário")
    void update_deveLancarExcecaoQuandoTarefaNaoPertenceAoUsuario() {
        
        User outro = new User();
        outro.setId(2L);
        outro.setUsername("outro");

        when(userRepository.findByUsername("outro")).thenReturn(Optional.of(outro));
        when(todoRepository.findByIdAndOwner(1L, outro)).thenReturn(Optional.empty());

        
        assertThrows(ResponseStatusException.class, () -> todoService.update(todo, "outro"));
        verify(todoRepository, never()).save(any()); // confirma que save() NUNCA foi chamado
    }

    // ===================== delete() =====================

    @Test
    @DisplayName("Deve excluir tarefa quando pertence ao usuário")
    void delete_deveExcluirQuandoTarefaPertenceAoUsuario() {
        
        when(userRepository.findByUsername("joao")).thenReturn(Optional.of(user));
        when(todoRepository.findByIdAndOwner(1L, user)).thenReturn(Optional.of(todo));
        when(todoRepository.findByOwner(eq(user), any(Sort.class))).thenReturn(List.of());

        
        List<Todo> result = todoService.delete(1L, "joao");

        
        verify(todoRepository).delete(todo); 
        assertTrue(result.isEmpty()); 
    }

    @Test
    @DisplayName("Deve lançar exceção ao tentar excluir tarefa de outro usuário")
    void delete_deveLancarExcecaoQuandoTarefaNaoPertenceAoUsuario() {
        
        User outro = new User();
        outro.setId(2L);
        outro.setUsername("outro");

        when(userRepository.findByUsername("outro")).thenReturn(Optional.of(outro));
        when(todoRepository.findByIdAndOwner(1L, outro)).thenReturn(Optional.empty());

        
        assertThrows(ResponseStatusException.class, () -> todoService.delete(1L, "outro"));
        verify(todoRepository, never()).delete(any()); 
    }
}