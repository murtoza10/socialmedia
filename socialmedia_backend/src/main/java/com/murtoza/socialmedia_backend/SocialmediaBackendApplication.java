package com.murtoza.socialmedia_backend;

import com.murtoza.socialmedia_backend.config.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class SocialmediaBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(SocialmediaBackendApplication.class, args);
	}

}
