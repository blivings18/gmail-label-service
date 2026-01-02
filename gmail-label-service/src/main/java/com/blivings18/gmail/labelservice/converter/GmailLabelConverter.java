package com.blivings18.gmail.labelservice.converter;

import java.util.Optional;

import com.blivings18.gmail.labelservice.domain.Label;
import com.blivings18.gmail.labelservice.dto.LabelDto;

public class GmailLabelConverter {
  public static Optional<Label> toDomain(com.google.api.services.gmail.model.Label label) {
      return Optional.ofNullable(label)
          .map(l -> new Label(
              l.getId(),
              l.getName(),
              l.getType(),
              l.getLabelListVisibility(),
              l.getMessageListVisibility()
          ));
  }

  public static LabelDto toDto(Label domain) {
      return new LabelDto(
          domain.id(),
          domain.name(),
          domain.type(),
          domain.labelListVisibility(),
          domain.messageListVisibility()
      );
  }

  public static com.google.api.services.gmail.model.Label toGmail(Label domain) {
    return new com.google.api.services.gmail.model.Label()
        .setId(domain.id())
        .setName(domain.name())
        .setLabelListVisibility(domain.labelListVisibility())
        .setMessageListVisibility(domain.messageListVisibility());
  }
}
