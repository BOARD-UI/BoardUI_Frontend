package edu.escuelaing.arsw.boardUI.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MVCController {

    @GetMapping("/")
    public String getHomePage() {
        return "home.html";
    }

    @GetMapping("/welcome")
    public String getLoginPage() {
        return "/public/welcome.html";
    }
}
