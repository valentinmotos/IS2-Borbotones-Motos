package com.borbotones.service;

import com.borbotones.dto.AlumnoDto;
import com.borbotones.entity.Alumno;
import com.borbotones.repository.AlumnoRepository;
import com.borbotones.repository.GradoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class AlumnoService {
    private final AlumnoRepository alumnoRepository;
    private final GradoRepository gradoRepository;

    public AlumnoService(AlumnoRepository alumnoRepository, GradoRepository gradoRepository) {
        this.alumnoRepository = alumnoRepository;
        this.gradoRepository = gradoRepository;
    }

    @Transactional(readOnly = true)
    public List<Alumno> listar() { return alumnoRepository.findAllByOrderByApellidoAscNombreAsc(); }

    @Transactional
    public void registrar(AlumnoDto dto) {
        Alumno alumno = new Alumno();
        alumno.setNombre(dto.getNombre());
        alumno.setApellido(dto.getApellido());
        alumno.setDocumento(dto.getDocumento());
        alumno.setGrado(gradoRepository.findById(dto.getGradoId())
                .orElseThrow(() -> new IllegalArgumentException("El grado no existe.")));
        alumnoRepository.save(alumno);
    }
}
