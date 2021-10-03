package edu.escuelaing.arsw.boardUI.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class MVCController {

    @GetMapping("/")
    public String getHomePage() {
        return "home.html";
    }

    @GetMapping("/login")
    public String getLoginPage() {
        return "/public/login.html";
    }
    
}
