package com.borbotones.repository;

import com.borbotones.entity.ProveedorMayorista;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProveedorRepository extends JpaRepository<ProveedorMayorista, Long> { }
