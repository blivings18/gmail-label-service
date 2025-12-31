package com.blivings18.gmail.labelservice.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.blivings18.gmail.labelservice.dto.CreateLabelDto;
import com.blivings18.gmail.labelservice.dto.LabelDto;
import com.blivings18.gmail.labelservice.service.GmailLabelService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/label")
@RequiredArgsConstructor
public class LabelController {
    private final GmailLabelService labelService;

    @GetMapping
    public List<LabelDto> getLabels() throws Exception {
        return labelService.listLabels();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public LabelDto createLabel(@RequestBody CreateLabelDto dto) throws Exception {
        return labelService.createLabel(dto);
    }
    
    @PatchMapping("/{id}")
    public LabelDto updateLabel(@PathVariable String id, @RequestBody Map<String, String> request) throws Exception {
        return labelService.updateLabel(id, request.get("name"));
    }

    @DeleteMapping("/{id}")
    public void deleteLabel(@PathVariable String id) throws Exception {
        labelService.deleteLabel(id);
    }
}
