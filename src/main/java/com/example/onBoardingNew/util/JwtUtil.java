package com.example.onBoardingNew.util;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

	private String secretKey = "mysecretkeymysecretkeymysecretkeymysecretkey";
	
	//method to convert string secret key to Key
	private Key getSigningKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }
	
	//method to generate JWT token
	public String generateToken(String username) {
		return Jwts.builder()
			.setSubject(username)
			.setIssuedAt(new Date())
			.setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
			.signWith(getSigningKey())
			.compact();
	}
	
	//method to extract username from token
	public String extractUsername(String token) {
		return Jwts.parserBuilder()
			.setSigningKey(getSigningKey())
			.build()
			.parseClaimsJws(token)
			.getBody()
			.getSubject();
		
	}
	
	//method to validate JWT token
	public boolean validateToken(String token, String username) {
		return extractUsername(token).equals(username);
	}
}
