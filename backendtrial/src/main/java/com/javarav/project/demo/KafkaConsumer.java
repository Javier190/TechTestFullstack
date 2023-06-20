package com.javarav.project.demo;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import com.javarav.project.demo.models.Task;

@Component
public class KafkaConsumer {

	@KafkaListener(topics = "your-topic-name", groupId = "group-id-alfa")
    public void consume(Task task) {
        // Lógica para procesar el mensaje recibido desde Kafka
        // ...
        System.out.println("Mensaje recibido desde Kafka: " + task);
    }
}


