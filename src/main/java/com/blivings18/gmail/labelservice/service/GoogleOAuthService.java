package com.blivings18.gmail.labelservice.service;

import java.io.InputStreamReader;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.stereotype.Service;

import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;

@Service
public class GoogleOAuthService {

    private static final List<String> SCOPES = List.of(
            "https://www.googleapis.com/auth/gmail.labels"
    );

    // Use GsonFactory instead of JacksonFactory
    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();

    public GoogleAuthorizationCodeFlow authorizationCodeFlow() throws Exception {

        GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(
                JSON_FACTORY,
                new InputStreamReader(
                        getClass().getResourceAsStream("/google-credentials.json")
                )
        );

        return new GoogleAuthorizationCodeFlow.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),
                JSON_FACTORY,
                clientSecrets,
                SCOPES
        )
        .setDataStoreFactory(
                new FileDataStoreFactory(
                        Paths.get("tokens").toFile()
                )
        )
        .setAccessType("offline")
        .build();
    }
}
