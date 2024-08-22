package com.hospital.hospital_platform;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories
public class HospitalPlatformApplication {
	public static void main(String[] args) {
		SpringApplication.run(HospitalPlatformApplication.class, args);
	}
}