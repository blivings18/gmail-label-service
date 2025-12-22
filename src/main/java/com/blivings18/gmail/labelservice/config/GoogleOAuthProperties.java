package com.blivings18.gmail.labelservice.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import lombok.Getter;
import lombok.Setter;

@Component
@ConfigurationProperties(prefix = "google.oauth")
@Getter
@Setter
public class GoogleOAuthProperties {
    private String applicationName;
    private String credentialUserId;

    @PostConstruct
    public void validate() {
        if (credentialUserId == null || credentialUserId.isBlank()) {
            throw new IllegalStateException(
                "Missing configuration: google.oauth.credential-user-id must be set in application.yml"
            );
        }
    }
}
