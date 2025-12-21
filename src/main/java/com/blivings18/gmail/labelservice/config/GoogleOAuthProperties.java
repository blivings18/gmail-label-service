package com.blivings18.gmail.labelservice.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

@Component
@ConfigurationProperties(prefix = "google.oauth")
public class GoogleOAuthProperties {

    /**
     * Identifier used to store and retrieve OAuth credentials.
     * Must remain consistent between authorization and API calls.
     */
    private String credentialUserId;

    public String getCredentialUserId() {
        return credentialUserId;
    }

    public void setCredentialUserId(String credentialUserId) {
        this.credentialUserId = credentialUserId;
    }

    @PostConstruct
    public void validate() {
        if (credentialUserId == null || credentialUserId.isBlank()) {
            throw new IllegalStateException(
                "Missing configuration: google.oauth.credential-user-id must be set in application.yml"
            );
        }
    }
}
