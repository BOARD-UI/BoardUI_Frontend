package edu.escuelaing.arsw.boardUI.controllers;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import edu.escuelaing.arsw.boardUI.model.User;
import edu.escuelaing.arsw.boardUI.services.impl.UserServices;

@Controller
public class UserController {

    @Autowired
    UserServices us;

    @GetMapping("/welcome")
    public String getLoginPage() {
        return "public/welcome";
    }

    @GetMapping("/public/{html}")
    public String getPublicHtml(@PathVariable String html){
        return "public/"+html;
    }

    @GetMapping("/html/{html}")
    public String getHtml(@PathVariable String html){
        return html;
    }

    @GetMapping("/home")
    public String getHomePage(Principal principal, Model model) {
        return "homepage";
    }
}
