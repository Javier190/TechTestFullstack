package com.javarav.project.demo.controllers;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.javarav.project.demo.models.Task;
import com.javarav.project.demo.repo.TaskRepository;



@RestController
@RequestMapping("/main")
public class TaskController {
	
	
	private final KafkaTemplate<String, Task> kafkaTemplate;
	private final String topicName = "your-topic-name";
	
	@Autowired
    private TaskRepository taskRepository;
	
	public TaskController(TaskRepository taskRepository, KafkaTemplate<String, Task> kafkaTemplate) {
        this.taskRepository = taskRepository;
        this.kafkaTemplate = kafkaTemplate;
    }
	
	@GetMapping(value="/test")
	public String metodoPrueba() {
		System.out.print("PRUEBasdasA CONSOLA");
		return "Hola Desde metodo Prueba";
	}
	
    @GetMapping("/tasks")
    public List<Task> getTasks() {
    	System.out.println("HOLA GET TASKS");
        return (List<Task>) taskRepository.findAll();
    }

    @PostMapping("/task")
    public Task createTask(@RequestBody Task task) {
        
    	Task savedTask = taskRepository.save(task);
        //kafkaTemplate.send(topicName, savedTask); Hay error al enviar el mensaje
        return savedTask;
        
    	/*return taskRepository.save(task);*/
    }

    
    @PutMapping("/task/update/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task task) {
        Task existingTask = taskRepository.findById(id).orElse(null);
        existingTask.setDescription(task.getDescription());
        existingTask.setCompleted(task.isCompleted());
        return taskRepository.save(existingTask);
    }
	
    @DeleteMapping("/task/delete/{id}")
    public void deleteTask(@PathVariable Long id) {
    	System.out.print("Metodo Delete desde Spring");
        taskRepository.deleteById(id);
    }

}
