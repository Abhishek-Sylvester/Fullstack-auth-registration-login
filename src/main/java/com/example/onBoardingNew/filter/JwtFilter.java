package com.example.onBoardingNew.filter;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.onBoardingNew.util.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {

	@Autowired
	JwtUtil jwtUtil;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		//skip filter check if api is /login or /registration
		String path = request.getRequestURI();
		if(path.equals("/api/auth/login") || path.equals("/api/auth/register")) {
		    filterChain.doFilter(request, response);
		    return;
		}
		
		//do filter check for all other API's which are not login or registration
		String authHeader = request.getHeader("Authorization");
		System.out.println("authHeader: "+authHeader);
		if(authHeader == null || !authHeader.startsWith("Bearer ")) {
		    filterChain.doFilter(request, response);
		    return;
		}
		
		
		String token = authHeader.split(" ")[1];
		System.out.println("This is the token: "+token);
		String userName =jwtUtil.extractUsername(token);
		System.out.println("Thiis is the username: "+userName);
		
		if(jwtUtil.validateToken(token, userName)) {
			System.out.println("Token valid");
			 filterChain.doFilter(request, response);
		}else {
			System.out.println("Token invalid");
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		}
		
		
	}

}
