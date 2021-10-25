package edu.escuelaing.arsw.boardUI.persistence.repo;

import edu.escuelaing.arsw.boardUI.model.Room;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IRoomRepo extends JpaRepository<Room, Integer> {

}
