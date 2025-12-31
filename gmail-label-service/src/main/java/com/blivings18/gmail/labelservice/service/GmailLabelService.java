package com.blivings18.gmail.labelservice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.blivings18.gmail.labelservice.converter.GmailLabelConverter;
import com.blivings18.gmail.labelservice.domain.Label;
import com.blivings18.gmail.labelservice.dto.CreateLabelDto;
import com.blivings18.gmail.labelservice.dto.LabelDto;
import com.google.api.services.gmail.Gmail;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GmailLabelService {
    private static <T> T defaultIfNull(T value, T defaultValue) {
        return value != null ? value : defaultValue;
    }

    private final GmailServiceFactory gmailServiceFactory;

    public List<LabelDto> listLabels() throws Exception {
        Gmail gmail = gmailServiceFactory.createGmailService();

        return gmail.users()
                    .labels()
                    .list("me")
                    .execute()
                    .getLabels()
                    .stream()
                    .map(GmailLabelConverter::toDomain)
                    .flatMap(Optional::stream)
                    .map(GmailLabelConverter::toDto)
                    .toList();
    }

    public LabelDto createLabel(CreateLabelDto dto) throws Exception {
        Gmail gmail = gmailServiceFactory.createGmailService();

        // 1. Build domain object (no ID yet)
        Label domainLabel = new Label(
            null,
            dto.name(),
            "user",
            defaultIfNull(dto.labelListVisibility(), "labelShow"),
            defaultIfNull(dto.messageListVisibility(), "show")
        );

        // 2. Convert domain → Gmail model
        com.google.api.services.gmail.model.Label gmailLabel =
            GmailLabelConverter.toGmail(domainLabel);

        // 3. Call Gmail API
        com.google.api.services.gmail.model.Label created =
            gmail.users()
                .labels()
                .create("me", gmailLabel)
                .execute();

        // 4. Convert back → domain → DTO
        return GmailLabelConverter.toDomain(created)
                .map(GmailLabelConverter::toDto)
                .orElseThrow(() -> new IllegalStateException("Failed to create label"));
    }

   public LabelDto updateLabel(String id, String newName) throws Exception {
        Gmail gmail = gmailServiceFactory.createGmailService();

        com.google.api.services.gmail.model.Label label = new com.google.api.services.gmail.model.Label()
                .setName(newName);

        com.google.api.services.gmail.model.Label updatedLabel = 
            gmail.users().labels().patch("me", id, label).execute();

        return GmailLabelConverter.toDomain(updatedLabel)
                                  .map(GmailLabelConverter::toDto)
                                  .orElseThrow(() -> new RuntimeException("Failed to update label"));
    }

    public void deleteLabel(String id) throws Exception {
        Gmail gmail = gmailServiceFactory.createGmailService();
        gmail.users().labels().delete("me", id).execute();
    }
}
