package edu.escuelaing.arsw.boardUI.services;

public class BoardUIServicesException extends Exception {

    public static final String USER_NOT_FOUND = "User was not found.";
    
    public BoardUIServicesException(String message) {
        super(message);
    }

    public BoardUIServicesException(String message, Throwable cause) {
        super(message, cause);
    }
}
