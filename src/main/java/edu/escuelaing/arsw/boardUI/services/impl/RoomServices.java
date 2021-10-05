package edu.escuelaing.arsw.boardUI.services.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.escuelaing.arsw.boardUI.model.Room;
import edu.escuelaing.arsw.boardUI.persistence.IRoomPersistence;
import edu.escuelaing.arsw.boardUI.services.IRoomServices;

@Service
public class RoomServices implements IRoomServices{

    @Autowired
    IRoomPersistence rp;

    public RoomServices() {}

    @Override
    public void saveRoom(Room room) {
        rp.saveRoom(room);
    }
    
}
