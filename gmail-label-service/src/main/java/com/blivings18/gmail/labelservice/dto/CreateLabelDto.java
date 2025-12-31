package com.blivings18.gmail.labelservice.dto;

public record CreateLabelDto(
    String name,
    String labelListVisibility,
    String messageListVisibility
) {}

