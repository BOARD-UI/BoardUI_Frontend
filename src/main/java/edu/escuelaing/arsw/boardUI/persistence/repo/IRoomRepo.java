package edu.escuelaing.arsw.boardUI.persistence.repo;

import edu.escuelaing.arsw.boardUI.model.Room;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

@Repository
public interface IRoomRepo extends JpaRepository<Room, Integer> {

}
