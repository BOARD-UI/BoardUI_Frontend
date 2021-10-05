package edu.escuelaing.arsw.boardUI.persistence.impl;

import edu.escuelaing.arsw.boardUI.model.User;
import edu.escuelaing.arsw.boardUI.persistence.repo.IUserRepo;
import edu.escuelaing.arsw.boardUI.persistence.BoardUIPersistenceException;
import edu.escuelaing.arsw.boardUI.persistence.IUserPersistence;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

@Repository
public class UserPersistenceImpl implements IUserPersistence {

    @Autowired
    IUserRepo ur;

    @PersistenceContext
    EntityManager manager;

    public UserPersistenceImpl(){}

    @Override
    public void saveUser(User user) {   
        ur.save(user);
    }

    @Override
    public User getUserByUsername(String username) throws  BoardUIPersistenceException{
        Query query = manager.createNativeQuery("SELECT * FROM users WHERE username=?", User.class);
        query.setParameter(1, username);
        if(query.getResultList().isEmpty()) throw new BoardUIPersistenceException(BoardUIPersistenceException.USER_NOT_FOUND);
        return (User) query.getSingleResult();
    }
    
}
