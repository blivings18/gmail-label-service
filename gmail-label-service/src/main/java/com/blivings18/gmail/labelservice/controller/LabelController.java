package com.blivings18.gmail.labelservice.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blivings18.gmail.labelservice.dto.LabelDto;
import com.blivings18.gmail.labelservice.service.GmailLabelService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/label")
@RequiredArgsConstructor
public class LabelController {
    private final GmailLabelService gmailLabelService;

    @GetMapping("/test")
    public String test() {
        return "Success!";
    }

    @GetMapping
    public List<LabelDto> getLabels() throws Exception {
        return gmailLabelService.listLabels();
    }
}
