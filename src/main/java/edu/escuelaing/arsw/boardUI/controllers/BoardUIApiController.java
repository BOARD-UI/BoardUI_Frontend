package edu.escuelaing.arsw.boardUI.controllers;

import javax.json.JsonObject;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

@RestController
public class BoardUIApiController {

    @RequestMapping(path = "/welcome/NewUser", method = RequestMethod.POST)
    public ResponseEntity<?> CreateNewUser(@RequestBody JsonObject newUser) {
        try {
            System.out.println(newUser);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.CREATED);
        }
    }

	
}
