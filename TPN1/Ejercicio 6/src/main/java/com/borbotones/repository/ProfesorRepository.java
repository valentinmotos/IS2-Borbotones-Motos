package com.borbotones.repository;

import com.borbotones.entity.Profesor;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ProfesorRepository extends JpaRepository<Profesor, Long> {
    Optional<Profesor> findByCorreo(String correo);
    boolean existsByCorreo(String correo);
}
