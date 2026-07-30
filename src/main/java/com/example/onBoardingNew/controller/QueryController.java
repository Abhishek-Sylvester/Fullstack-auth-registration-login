package com.example.onBoardingNew.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.onBoardingNew.model.UserQueryRequestModel;
import com.example.onBoardingNew.service.QueryService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/auth")
public class QueryController {

    @Autowired
    QueryService queryService;

    @PostMapping("/putUserQuery")
    public ResponseEntity<String> putUserQuery(@RequestBody UserQueryRequestModel userquerymodel) {
        System.out.println("putUserQuery controller called");
        System.out.println("Name: " + userquerymodel.getName());
        System.out.println("Description: " + userquerymodel.getDescription());

        try {
            queryService.insertUserQuery(userquerymodel);
            return ResponseEntity.ok("Data saved successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INSUFFICIENT_STORAGE).body("Failed to save Data");
        }

    }

    @GetMapping("/loadQueries")
    public ResponseEntity<List<UserQueryRequestModel>> loadUserQueries() {
        System.out.println("loadUserQueries controller called");
        List<UserQueryRequestModel> userQueryList = queryService.loadUserQueries();
        return ResponseEntity.ok(userQueryList);
    }

}
