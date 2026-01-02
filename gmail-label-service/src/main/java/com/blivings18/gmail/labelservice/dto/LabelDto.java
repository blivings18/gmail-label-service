package com.blivings18.gmail.labelservice.dto;

public record LabelDto(
  String id,
  String name,
  String type,
  String labelListVisibility,
  String messageListVisibility
) {}
