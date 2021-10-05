package edu.escuelaing.arsw.boardUI.persistence.impl;

import edu.escuelaing.arsw.boardUI.model.Room;
import edu.escuelaing.arsw.boardUI.persistence.repo.IRoomRepo;
import edu.escuelaing.arsw.boardUI.persistence.BoardUINotFoundException;
import edu.escuelaing.arsw.boardUI.persistence.IRoomPersistence;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

@Repository
public class RoomPersistenceImpl implements IRoomPersistence {

    @Autowired
    IRoomRepo ro;

    @PersistenceContext
    EntityManager manager;

    public RoomPersistenceImpl(){}

    @Override
    public void saveRoom(Room room) {
        ro.save(room);
    }
    
}
