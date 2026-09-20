package com.borbotones.repository;

import com.borbotones.entity.PagoCuota;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PagoCuotaRepository extends JpaRepository<PagoCuota, Long> {
    List<PagoCuota> findTop20ByOrderByFechaDesc();
}
