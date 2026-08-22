package com.example.onBoardingNew.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.onBoardingNew.model.RefreshTokenModel;

@Repository
public interface RequestTokenRepository extends JpaRepository<RefreshTokenModel, Long> {

    Optional<RefreshTokenModel> findByToken(String token);

    void deleteByToken(String token);
}
