package edu.escuelaing.arsw.boardUI.security.repository;

import java.util.Optional; 
import org.springframework.data.jpa.repository.JpaRepository; 
import org.springframework.stereotype.Repository;

import edu.escuelaing.arsw.boardUI.security.model.*;

@Repository 
public interface UserRepository extends JpaRepository<User, String> { 
   Optional<User> findUserByUsername(String username); 
}