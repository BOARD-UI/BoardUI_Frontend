package edu.escuelaing.arsw.boardUI.persistence;

public class BoardUIPersistenceException extends Exception {

    public static final String USER_NOT_FOUND = "User was not found.";
    
    public BoardUIPersistenceException(String message) {
        super(message);
    }

    public BoardUIPersistenceException(String message, Throwable cause) {
        super(message, cause);
    }
}
