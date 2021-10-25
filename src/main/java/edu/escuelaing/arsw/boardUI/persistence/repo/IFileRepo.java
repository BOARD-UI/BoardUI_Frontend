package edu.escuelaing.arsw.boardUI.persistence.repo;

import edu.escuelaing.arsw.boardUI.model.File;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IFileRepo extends JpaRepository<File, Integer> {}
