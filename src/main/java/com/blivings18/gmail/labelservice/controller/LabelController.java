package com.blivings18.gmail.labelservice.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/label")
public class LabelController {

    @GetMapping("/test")
    public String test() {
        return "Success!";
    }
}
