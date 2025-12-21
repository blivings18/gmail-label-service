package com.blivings18.gmail.labelservice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.blivings18.gmail.labelservice.converter.GmailLabelConverter;
import com.blivings18.gmail.labelservice.dto.LabelDto;
import com.google.api.services.gmail.Gmail;

@Service
public class GmailLabelService {

    private final GmailServiceFactory gmailServiceFactory;

    public GmailLabelService(GmailServiceFactory gmailServiceFactory) {
        this.gmailServiceFactory = gmailServiceFactory;
    }


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
}
