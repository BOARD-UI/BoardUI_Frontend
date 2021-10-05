package edu.escuelaing.arsw.boardUI.persistence;

import edu.escuelaing.arsw.boardUI.model.User;

public interface IUserPersistence {
    
    void saveUser(User user);
    User getUserByUsername(String username) throws  BoardUIPersistenceException;

}
