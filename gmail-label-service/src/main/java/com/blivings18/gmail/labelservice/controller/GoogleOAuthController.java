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

import jakarta.servlet.http.HttpServletRequest;
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
    public void authorize(@RequestParam(value = "redirect", required = false) String redirectUrl, HttpServletRequest request, HttpServletResponse response) throws Exception {
        GoogleAuthorizationCodeFlow flow = oAuthService.authorizationCodeFlow();

        String url = flow.newAuthorizationUrl()
                .setRedirectUri("http://localhost:8080/api/v1/google/oauth/callback")
                .build();

        // Store redirectUrl in session or temporary store so callback knows where to go
        request.getSession().setAttribute("redirectUrl", redirectUrl);

        response.sendRedirect(url);
    }

    @GetMapping("/callback")
    public void callback(@RequestParam("code") String code,
                        HttpServletRequest request,
                        HttpServletResponse response) throws Exception {
        GoogleAuthorizationCodeFlow flow = oAuthService.authorizationCodeFlow();

        GoogleTokenResponse tokenResponse = flow
                .newTokenRequest(code)
                .setRedirectUri("http://localhost:8080/api/v1/google/oauth/callback")
                .execute();

        flow.createAndStoreCredential(tokenResponse, googleOAuthProperties.getCredentialUserId());

        // Retrieve redirect URL stored in session
        String redirectUrl = (String) request.getSession().getAttribute("redirectUrl");

        if (redirectUrl == null || redirectUrl.isBlank()) {
            redirectUrl = "http://localhost:3000/"; // fallback
        }

        response.sendRedirect(redirectUrl);
    }

    @GetMapping("/status")
    public Map<String, Boolean> status() throws Exception {
        boolean authorized = statusService.isAuthorized();
        return Map.of("authorized", authorized);
    }

    @GetMapping("/status")
    public Map<String, Boolean> status() throws Exception {
        boolean authorized = statusService.isAuthorized();
        return Map.of("authorized", authorized);
    }
}
