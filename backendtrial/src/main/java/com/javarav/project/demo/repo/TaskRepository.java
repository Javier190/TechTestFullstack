package com.javarav.project.demo.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.javarav.project.demo.models.Task;

@Repository
public interface TaskRepository extends CrudRepository<Task, Long> {
    Task save(Task task);
    void deleteById(Long id);
}