package com.example.onBoardingNew.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.onBoardingNew.model.UserQueryRequestModel;
import com.example.onBoardingNew.repository.UserQueryRepository;
import com.example.onBoardingNew.repository.UserRepository;

@Service
public class QueryService {

    @Autowired
    UserQueryRepository userQueryRepository;

    public UserQueryRequestModel insertUserQuery(UserQueryRequestModel userData) {
        Date currentDate = new Date();
        userData.setInsertDate(currentDate);
        userData.setUpdateDate(currentDate);
        return userQueryRepository.save(userData); // save query data in DB

    }

    public List<UserQueryRequestModel> loadUserQueries() {
        List<UserQueryRequestModel> userQueryList = userQueryRepository.findAll();
        System.out.println("userQueryList: " + userQueryList);
        return userQueryList;
    }
}
