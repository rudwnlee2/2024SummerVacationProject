package com.hospital.hospital_platform.repository;

import com.hospital.hospital_platform.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
}
