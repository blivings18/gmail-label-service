package com.blivings18.gmail.labelservice.service;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;

@Service
public class GoogleOAuthService {
    private static final String GOOGLE_CREDS_FILE = "/google-credentials.json";
    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
    private static final List<String> SCOPES = List.of(
        "https://www.googleapis.com/auth/gmail.labels"
    );

    public GoogleAuthorizationCodeFlow authorizationCodeFlow() throws Exception {
        InputStream credentialsStream = Optional
            .ofNullable(getClass().getResourceAsStream(GOOGLE_CREDS_FILE))
            .orElseThrow(() -> new IllegalStateException(
                String.format(
                    "Missing src/main/resources%s. " +
                    "Copy google-credentials.example.json and fill in your OAuth credentials.",
                    GOOGLE_CREDS_FILE
                )
            ));

        GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(
            JSON_FACTORY,
            new InputStreamReader(credentialsStream)
        );

        return new GoogleAuthorizationCodeFlow.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),
                JSON_FACTORY,
                clientSecrets,
                SCOPES
        )
        .setDataStoreFactory(
            new FileDataStoreFactory(Paths.get("tokens").toFile())
        )
        .setAccessType("offline")
        .build();
    }
}
