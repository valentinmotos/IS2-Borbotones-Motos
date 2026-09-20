package com.borbotones.repository;

import com.borbotones.entity.Socio;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SocioRepository extends JpaRepository<Socio, Long> {
    List<Socio> findAllByOrderByApellidoAscNombreAsc();
}
