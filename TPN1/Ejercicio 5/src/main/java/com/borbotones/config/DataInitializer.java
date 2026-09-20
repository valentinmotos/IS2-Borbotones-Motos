package com.borbotones.config;

import com.borbotones.entity.Producto;
import com.borbotones.entity.ProveedorMayorista;
import com.borbotones.entity.Usuario;
import com.borbotones.repository.ProductoRepository;
import com.borbotones.repository.ProveedorRepository;
import com.borbotones.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;

@Configuration
public class DataInitializer {
    @Bean
    CommandLineRunner cargarDatos(UsuarioRepository usuarios, ProveedorRepository proveedores,
                                  ProductoRepository productos, PasswordEncoder encoder) {
        return args -> {
            if (usuarios.count() == 0) {
                Usuario usuario = new Usuario();
                usuario.setNombre("Usuario");
                usuario.setApellido("Compras");
                usuario.setCorreo("compras@borbotones.com");
                usuario.setClave(encoder.encode("Borbotones123"));
                usuarios.save(usuario);
            }
            if (proveedores.count() == 0) {
                ProveedorMayorista proveedor = new ProveedorMayorista();
                proveedor.setRazonSocial("TecnoMayorista S.A.");
                proveedor.setCuit("30-12345678-9");
                proveedor.setCorreo("ventas@tecnomayorista.com");
                proveedor.setTelefono("2615550101");
                proveedores.save(proveedor);
            }
            if (productos.count() == 0) {
                Producto notebook = new Producto();
                notebook.setNombre("Notebook Borbotones 14");
                notebook.setCodigo("NB-014");
                notebook.setPrecio(new BigDecimal("850000.00"));
                notebook.setStock(8);
                productos.save(notebook);
                Producto teclado = new Producto();
                teclado.setNombre("Teclado mecánico RGB");
                teclado.setCodigo("TEC-RGB");
                teclado.setPrecio(new BigDecimal("65000.00"));
                teclado.setStock(25);
                productos.save(teclado);
            }
        };
    }
}
