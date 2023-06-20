package com.javarav.project.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;


@Configuration
@SpringBootApplication
public class DemoApplication {
	
	 @Autowired
	 private KafkaProducer kafkaProducer;

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
		System.out.println("Hello Jav Arav Project");
	}
	
	public void someMethod() {
        // SOLO Probando KAFKA
        kafkaProducer.sendMessage("¡Hola, Kafka!");
    }

}
