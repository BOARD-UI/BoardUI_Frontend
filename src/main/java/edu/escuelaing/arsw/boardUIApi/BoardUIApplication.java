package edu.escuelaing.arsw.boardUIApi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"edu.escuelaing.arsw.boardUI"})
public class BoardUIApplication {
    public static void main(String[] args) {
		SpringApplication.run(BoardUIApplication.class, args);
	}
}