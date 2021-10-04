package edu.escuelaing.arsw.boardUI.persistence;

import edu.escuelaing.arsw.boardUI.model.*;

public interface BoardUIPersistence {

    public void saveRoom() throws BoardUIPersistenceException;

    public Room getRoom(String idRoom) throws BoardUINotFoundException;

    public void getMembers(String Room) throws BoardUINotFoundException;

    public void getURL(String Room) throws BoardUINotFoundException;

}
