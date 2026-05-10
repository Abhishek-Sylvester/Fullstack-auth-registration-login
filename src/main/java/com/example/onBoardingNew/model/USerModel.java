package com.example.onBoardingNew.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
public class USerModel {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
private String username;
private String email;
private String password;

public USerModel() {}


USerModel(String username, String email, String password){
	this.username = username;
	this.email = email;
	this.password = password;
}

public String getUsername() {
	return this.username;
}

public String getEmail() {
	return this.email;
}

public String getPassword() {
	return this.password;
}

public void setUsername(String username) {
	this.username = username;
}

public void setEmail(String email) {
	this.email = email;
}

public void setPassword(String password) {
	this.password = password;
}

}
