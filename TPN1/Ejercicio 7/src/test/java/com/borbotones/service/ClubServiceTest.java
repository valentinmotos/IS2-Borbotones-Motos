package com.borbotones.service;

import com.borbotones.dto.PagoCuotaDto;
import com.borbotones.entity.MedioPago;
import com.borbotones.entity.GrupoFamiliar;
import com.borbotones.repository.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.math.BigDecimal;
import java.util.Optional;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ClubServiceTest {
    @Mock SocioRepository socioRepository;
    @Mock GrupoFamiliarRepository grupoRepository;
    @Mock RegistroAccesoRepository accesoRepository;
    @Mock PagoCuotaRepository pagoRepository;

    @Test
    void registraUnaCuotaConMercadoPago() {
        GrupoFamiliar grupo = new GrupoFamiliar();
        when(grupoRepository.findById(1L)).thenReturn(Optional.of(grupo));
        ClubService service = new ClubService(socioRepository, grupoRepository, accesoRepository, pagoRepository);
        PagoCuotaDto dto = new PagoCuotaDto(); dto.setGrupoFamiliarId(1L); dto.setImporte(new BigDecimal("18000")); dto.setMedioPago(MedioPago.MERCADO_PAGO);
        service.registrarPago(dto);
        verify(pagoRepository).save(any());
    }
}
