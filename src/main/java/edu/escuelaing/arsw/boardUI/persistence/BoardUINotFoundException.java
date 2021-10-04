package edu.escuelaing.arsw.boardUI.persistence;

public class BoardUINotFoundException extends Exception {

    public BoardUINotFoundException(String message) {
        super(message);
    }

    public BoardUINotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
