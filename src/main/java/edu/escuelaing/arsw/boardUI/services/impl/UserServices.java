package edu.escuelaing.arsw.boardUI.services.impl;

import edu.escuelaing.arsw.boardUI.model.User;
import edu.escuelaing.arsw.boardUI.services.IUserServices;
import edu.escuelaing.arsw.boardUI.services.BoardUIServicesException;
import edu.escuelaing.arsw.boardUI.persistence.BoardUIPersistenceException;
import edu.escuelaing.arsw.boardUI.persistence.IUserPersistence;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServices implements IUserServices {

    @Autowired
    IUserPersistence up;

    public UserServices() {}
    
    @Override
    public void addUser(User user) {
        up.saveUser(user);
    }

    @Override
    public User getUserByUsername(String username) throws  BoardUIServicesException{
        try {
            return up.getUserByUsername(username);
        } catch (BoardUIPersistenceException ex) {
            throw new BoardUIServicesException(BoardUIServicesException.USER_NOT_FOUND);
        }
    }
    
}
