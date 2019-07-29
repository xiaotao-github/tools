package com.vcooc.experiment.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/test")
public class TestSocketController {
    @RequestMapping("/testSocket")
    public String testSocket(){
        return "/testSocket";
    }
}
