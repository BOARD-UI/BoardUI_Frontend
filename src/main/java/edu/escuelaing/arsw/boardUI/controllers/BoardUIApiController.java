package edu.escuelaing.arsw.boardUI.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import edu.escuelaing.arsw.boardUI.model.User;
import edu.escuelaing.arsw.boardUI.services.BoardUIServicesException;
import edu.escuelaing.arsw.boardUI.services.impl.UserServices;

import org.springframework.http.ResponseEntity;

@RestController
public class BoardUIApiController {

    @Autowired
    UserServices us;

    @RequestMapping(path = "/welcome/NewUser", method = RequestMethod.POST)
    public ResponseEntity<?> CreateNewUser(@RequestBody User newUser) {
        try {
            System.out.println(newUser);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.CREATED);
        }
    }

    @RequestMapping(path = "/public/user/{username}", method = RequestMethod.GET)
    public ResponseEntity<?> getHomePage(@PathVariable("username") String username) throws BoardUIServicesException {
        User user = us.getUserByUsername(username);
        return new ResponseEntity<>(user.toString(),HttpStatus.CREATED);
    }

	
}
