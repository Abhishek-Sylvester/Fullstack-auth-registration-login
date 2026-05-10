package com.example.onBoardingNew.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.onBoardingNew.model.USerModel;
import com.example.onBoardingNew.repository.UserRepository;
import com.example.onBoardingNew.util.JwtUtil;

@Service
public class AuthService {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private JwtUtil jwtUtil;
	
	public String registerUser(USerModel userModel) {
		System.out.println("registerUser service called");
		String hashedPassword = passwordEncoder.encode(userModel.getPassword());
		userModel.setPassword(hashedPassword);
		userRepository.save(userModel);
		return "User registered successfully";
	}
	
	public String findUser(USerModel userModel) {
		Optional<USerModel> userData = userRepository.findByUsername(userModel.getUsername());
		if(userData.isPresent()) {
			System.out.println("The user data is present");
			USerModel existingUser = userData.get();
			if(passwordEncoder.matches(userModel.getPassword(), existingUser.getPassword())) {
				String token = jwtUtil.generateToken(existingUser.getUsername());
				System.out.println("Password correct");
				return token;
			}else {
				System.out.println("Password incorrect");
				return "Password incorrect";
			}
			
		}else {
			System.out.println("User data not present");
		}
		return "User data not present";
	}
}
