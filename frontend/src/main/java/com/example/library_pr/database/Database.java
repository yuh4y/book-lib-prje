package com.example.library_pr.database;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.library_pr.models.Book;
import com.example.library_pr.repositories.BookRepository;

@Configuration
public class Database {
	private static final Logger logger = LoggerFactory.getLogger(Database.class);
	
	@Bean
	CommandLineRunner initDatabase(BookRepository bookRepository) {
		return new CommandLineRunner() {
			
			@Override
			public void run(String... args) throws Exception {
				// TODO Auto-generated method stub
				
			}
		};
	}
}
