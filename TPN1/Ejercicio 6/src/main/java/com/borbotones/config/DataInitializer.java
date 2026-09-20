package com.borbotones.config;

import com.borbotones.entity.*;
import com.borbotones.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.time.LocalDate;

@Configuration
public class DataInitializer {
    @Bean
    CommandLineRunner cargarDatos(ProfesorRepository profesores, AulaRepository aulas,
                                  GradoRepository grados, AlumnoRepository alumnos,
                                  PasswordEncoder encoder) {
        return args -> {
            if (profesores.count() == 0) {
                Profesor profesor = new Profesor();
                profesor.setNombre("María"); profesor.setApellido("Docente"); profesor.setSexo("Femenino");
                profesor.setFechaNacimiento(LocalDate.of(1985, 5, 20));
                profesor.setCorreo("docente@borbotones.com"); profesor.setClave(encoder.encode("Borbotones123"));
                profesores.save(profesor);
            }
            if (aulas.count() == 0) {
                Aula aula = new Aula(); aula.setNombre("Aula 1"); aula.setCapacidad(30); aulas.save(aula);
                Grado grado = new Grado(); grado.setNombre("Primer grado"); grado.setAula(aula); grados.save(grado);
                Alumno alumno = new Alumno(); alumno.setNombre("Ana"); alumno.setApellido("Gómez");
                alumno.setDocumento("40111222"); alumno.setGrado(grado); alumnos.save(alumno);
            }
        };
    }
}
