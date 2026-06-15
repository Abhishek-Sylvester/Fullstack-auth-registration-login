package com.example.onBoardingNew.controller;

import java.io.File;
import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.onBoardingNew.model.USerModel;
import com.example.onBoardingNew.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	private AuthService authService;

	@PostMapping("/register")
	public String register(@RequestBody USerModel data) {
		System.out.println("Received: " + data);
		authService.registerUser(data);
		return "Got it";
	}

	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody USerModel data) {
		System.out.println("Login controller called");
		String response = authService.findUser(data);
		System.out.println("This is the response: " + response);
		if (response.equals("User data not present") || response.equals("Password incorrect")) {
			return ResponseEntity.status(401).body(response);
		}
		return ResponseEntity.ok(response);

	}

	@GetMapping("/practice")
	public String practiceEndPoint(@RequestHeader("Authorization") String token) {
		System.out.println("Practice controller called");
		System.out.println("This is the token: " + token);
		return "";
	}

	@PostMapping("/s3/upload")
	public ResponseEntity<?> uploadDataToS3(@RequestParam("file") MultipartFile[] multipartFile) {
		System.out.println(" controller called");
		List<MultipartFile> uploadFiles = Arrays.asList(multipartFile);
		for (MultipartFile uploadFile : uploadFiles) {
			System.out.println("This is the uploaded file name: " + uploadFile.getOriginalFilename());
			System.out.println("File size: " + uploadFile.getSize());
		}

		List<String> fileUrls = authService.uploadFile(uploadFiles);
		if (!fileUrls.isEmpty()) {
			return ResponseEntity.status(200).body(fileUrls);
		} else {
			return ResponseEntity.status(400).body("Upload Failed");
		}

	}
}
