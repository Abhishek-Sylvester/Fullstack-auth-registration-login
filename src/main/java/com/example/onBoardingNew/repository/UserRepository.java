package com.example.onBoardingNew.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.onBoardingNew.model.USerModel;

@Repository
public interface UserRepository extends JpaRepository<USerModel, Long> {

	Optional<USerModel> findByUsername(String username);
}
