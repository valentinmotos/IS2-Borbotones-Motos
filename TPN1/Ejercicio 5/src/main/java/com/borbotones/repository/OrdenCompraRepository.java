package com.borbotones.repository;

import com.borbotones.entity.OrdenCompra;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrdenCompraRepository extends JpaRepository<OrdenCompra, Long> {
    List<OrdenCompra> findAllByOrderByFechaDesc();
}
