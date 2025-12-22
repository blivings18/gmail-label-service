package com.blivings18.gmail.labelservice.converter;

import java.util.Optional;

import com.blivings18.gmail.labelservice.domain.Label;
import com.blivings18.gmail.labelservice.dto.LabelDto;

public class GmailLabelConverter {
  public static Optional<Label> toDomain(com.google.api.services.gmail.model.Label label) {
    return Optional.ofNullable(label)
      .map(l -> new Label(l.getId(), l.getName(), l.getType()));
  }

  public static LabelDto toDto(Label domain) {
      return new LabelDto(domain.id(), domain.name(), domain.type());
  }
}
