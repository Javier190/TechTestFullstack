package com.javarav.project.demo.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

import com.javarav.project.demo.controllers.TaskController;
import com.javarav.project.demo.models.Task;
import com.javarav.project.demo.repo.TaskRepository;

@SpringJUnitConfig
@SpringBootTest
public class TaskControllerTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskController taskController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testGetTasks() {
        // Arrange
        List<Task> tasks = new ArrayList<>();
        tasks.add(new Task(1L, "Task 1", "Description 1", false));
        tasks.add(new Task(2L, "Task 2", "Description 2", true));
        when(taskRepository.findAll()).thenReturn(tasks);

        // Act
        List<Task> result = taskController.getTasks();

        // Assert
        assertEquals(tasks, result);
        verify(taskRepository, times(1)).findAll();
    }

    @Test
    public void testCreateTask() {
        // Arrange
        Task task = new Task(1L, "New Task", "Description", false);
        when(taskRepository.save(any(Task.class))).thenReturn(task);

        // Act
        Task result = taskController.createTask(task);

        // Assert
        assertEquals(task, result);
        verify(taskRepository, times(1)).save(task);
    }

    @Test
    public void testUpdateTask() {
        // Arrange
        Long taskId = 1L;
        Task existingTask = new Task(taskId, "Existing Task", "Existing Description", false);
        Task updatedTask = new Task(taskId, "Updated Task", "Updated Description", true);
        when(taskRepository.findById(taskId)).thenReturn(java.util.Optional.of(existingTask));
        when(taskRepository.save(existingTask)).thenReturn(updatedTask);

        // Act
        Task result = taskController.updateTask(taskId, updatedTask);

        // Assert
        assertEquals(updatedTask, result);
        assertEquals("Updated Task", existingTask.getDescription());
        assertEquals(true, existingTask.isCompleted());
        verify(taskRepository, times(1)).findById(taskId);
        verify(taskRepository, times(1)).save(existingTask);
    }

    @Test
    public void testDeleteTask() {
        // Arrange
        Long taskId = 1L;

        // Act
        taskController.deleteTask(taskId);

        // Assert
        verify(taskRepository, times(1)).deleteById(taskId);
    }
}
