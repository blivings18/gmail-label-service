package com.blivings18.gmail.labelservice.service;

import org.springframework.stereotype.Service;

import com.blivings18.gmail.labelservice.config.GoogleOAuthProperties;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GoogleOAuthStatusService {

    private final GoogleOAuthService oAuthService;
    private final GoogleOAuthProperties googleOAuthProperties;

    public boolean isAuthorized() throws Exception {
        var flow = oAuthService.authorizationCodeFlow();

        // Load the stored credential using your user ID
        var credential = flow.loadCredential(googleOAuthProperties.getCredentialUserId());

        if (credential == null) {
            // No token stored
            return false;
        }

        // Check if token is expired
        Long expiration = credential.getExpirationTimeMilliseconds();
        if (expiration == null) {
            // No expiration (refresh token present)
            return true;
        }

        if (expiration <= System.currentTimeMillis()) {
            // Attempt to refresh token
            return credential.refreshToken();
        }

        return true; // token still valid
    }
}

