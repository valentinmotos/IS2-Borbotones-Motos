package com.borbotones.config;

import com.borbotones.entity.*;
import com.borbotones.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.math.BigDecimal;
import java.time.LocalDate;

@Configuration
public class DataInitializer {
    @Bean
    CommandLineRunner cargarDatos(UsuarioRepository usuarios, GrupoFamiliarRepository grupos,
                                  SocioRepository socios, PasswordEncoder encoder) {
        return args -> {
            if (usuarios.count() == 0) {
                Usuario usuario = new Usuario(); usuario.setCorreo("club@borbotones.com");
                usuario.setClave(encoder.encode("Borbotones123")); usuarios.save(usuario);
            }
            if (grupos.count() == 0) {
                GrupoFamiliar grupo = new GrupoFamiliar(); grupo.setNombre("Familia Motos");
                grupo.setCuotaMensual(new BigDecimal("18000.00")); grupos.save(grupo);
                Socio titular = new Socio(); titular.setNombre("Valentín"); titular.setApellido("Motos");
                titular.setDocumento("40111222"); titular.setFechaNacimiento(LocalDate.of(1995, 8, 12));
                titular.setGrupoFamiliar(grupo); socios.save(titular);
            }
        };
    }
}
