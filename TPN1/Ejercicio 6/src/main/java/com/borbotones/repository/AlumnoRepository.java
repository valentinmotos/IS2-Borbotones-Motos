package com.borbotones.repository;

import com.borbotones.entity.Alumno;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AlumnoRepository extends JpaRepository<Alumno, Long> {
    List<Alumno> findAllByOrderByApellidoAscNombreAsc();
}
