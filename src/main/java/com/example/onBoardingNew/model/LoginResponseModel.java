package com.example.onBoardingNew.model;

public class LoginResponseModel {
    private String accessToken;
    private String refreshToken;

    public LoginResponseModel(String accessToken, String refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

    public String getAccessToken() {
        return this.accessToken;
    }

    public String getRefreshToken() {
        return this.refreshToken;
    }
}
