package com.blivings18.gmail.labelservice.service;

import org.springframework.stereotype.Component;

import com.blivings18.gmail.labelservice.config.GoogleOAuthProperties;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.gmail.Gmail;

@Component
public class GmailServiceFactory {
    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
    private static final String APPLICATION_NAME = "gmail-label-service-local"; // TODO: Prop?
    private final GoogleOAuthProperties googleOAuthProperties;
    private final GoogleOAuthService googleOAuthService;


    public GmailServiceFactory(
            GoogleOAuthService googleOAuthService,
            GoogleOAuthProperties googleOAuthProperties) {
        this.googleOAuthService = googleOAuthService;
        this.googleOAuthProperties = googleOAuthProperties;
    }

    public Gmail createGmailService() throws Exception {
        return new Gmail.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),
                JSON_FACTORY,
                googleOAuthService
                        .authorizationCodeFlow()
                        .loadCredential(googleOAuthProperties.getCredentialUserId()) // use stored Oauth token
        )
        .setApplicationName(APPLICATION_NAME)
        .build();
    }
}
