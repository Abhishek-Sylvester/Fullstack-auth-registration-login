package com.example.onBoardingNew.repository;

import org.springframework.stereotype.Repository;
import com.example.onBoardingNew.model.UserQueryRequestModel;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface UserQueryRepository extends JpaRepository<UserQueryRequestModel, Long> {

}
