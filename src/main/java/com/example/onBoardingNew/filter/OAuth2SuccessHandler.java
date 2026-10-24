package com.example.onBoardingNew.filter;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.example.onBoardingNew.model.AuthProvider;
import com.example.onBoardingNew.model.LoginResponseModel;
import com.example.onBoardingNew.model.RefreshTokenModel;
import com.example.onBoardingNew.model.USerModel;
import com.example.onBoardingNew.repository.UserRepository;
import com.example.onBoardingNew.util.JwtUtil;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.oauth2.core.user.OAuth2User;

@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    JwtUtil jwtUtil;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {
        OAuth2User OAuth2User = (OAuth2User) authentication.getPrincipal();
        String sub = OAuth2User.getAttribute("sub");
        String email = OAuth2User.getAttribute("email");
        String name = OAuth2User.getAttribute("name");
        System.out.println(sub);
        System.out.println(email);
        System.out.println(name);
        USerModel user;
        Optional<USerModel> userData = userRepository.findByProviderAndProviderId(AuthProvider.GOOGLE, sub);
        if (userData.isPresent()) {
            user = userData.get();
            System.out.println("User already exists");
            System.out.println("Username: " + userData.get().getUsername());

        } else {
            System.out.println("User does not exist, creating new user");
            user = new USerModel();
            user.setUsername(name);
            user.setEmail(email);
            user.setProvider(AuthProvider.GOOGLE);
            user.setProviderId(sub);
            userRepository.save(user);
            System.out.println("New user saved");
        }

        String token = jwtUtil.generateToken(user.getUsername());
        RefreshTokenModel refreshToken = jwtUtil.createRefreshToken(user.getUsername());
        LoginResponseModel loginModel = new LoginResponseModel(token, refreshToken.getToken());
        System.out.println("This is the token: " + token);
        response.sendRedirect(
                "http://localhost:4200/oauth-callback?token=" + token + "&refreshtoken=" + refreshToken.getToken());
    }

}
