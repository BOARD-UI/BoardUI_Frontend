package edu.escuelaing.arsw.boardUI.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class BoardUIFrontendController {
    
    @GetMapping("/welcome")
    public String getLoginPage() {
        return "templates/public/welcome.html";
    }

    @GetMapping("/home")
    public String getHomePage() {
        return "templates/homepage.html";
    }
}
