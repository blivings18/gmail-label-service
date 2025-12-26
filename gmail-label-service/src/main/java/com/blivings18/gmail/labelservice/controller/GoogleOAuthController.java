package com.blivings18.gmail.labelservice.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.blivings18.gmail.labelservice.config.GoogleOAuthProperties;
import com.blivings18.gmail.labelservice.service.GoogleOAuthService;
import com.blivings18.gmail.labelservice.service.GoogleOAuthStatusService;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/google/oauth")
@RequiredArgsConstructor
public class GoogleOAuthController {
    private final GoogleOAuthService oAuthService;
    private final GoogleOAuthStatusService statusService;
    private final GoogleOAuthProperties googleOAuthProperties;

    @GetMapping("/authorize")
    public void authorize(HttpServletResponse response) throws Exception {
        GoogleAuthorizationCodeFlow flow = oAuthService.authorizationCodeFlow();

        String url = flow.newAuthorizationUrl()
                .setRedirectUri("http://localhost:8080/api/v1/google/oauth/callback")
                .build();

        response.sendRedirect(url);
    }

    @GetMapping("/callback")
    public String callback(@RequestParam("code") String code) throws Exception {
        GoogleAuthorizationCodeFlow flow = oAuthService.authorizationCodeFlow();

        GoogleTokenResponse tokenResponse = flow
                .newTokenRequest(code)
                .setRedirectUri("http://localhost:8080/api/v1/google/oauth/callback")
                .execute();

        flow.createAndStoreCredential(tokenResponse, googleOAuthProperties.getCredentialUserId());

        return "OAuth successful ✅ You can close this window.";
    }

    @GetMapping("/status")
    public Map<String, Boolean> status() throws Exception {
        boolean authorized = statusService.isAuthorized();
        return Map.of("authorized", authorized);
    }
}
