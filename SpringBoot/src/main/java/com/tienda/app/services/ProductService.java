package com.tienda.app.services;

import com.tienda.app.models.Product;
import com.tienda.app.models.User;
import com.tienda.app.repositories.ProductRepository;
import com.tienda.app.repositories.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.Base64;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public ProductService(ProductRepository productRepository, UserRepository userRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    public Product createProduct(String name, String description, MultipartFile image,
                                 BigDecimal price, double tax, String currency) throws IOException {

        // Obtener el usuario autenticado
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName(); // ✅ Obtener usuario autenticado
        System.out.println("Usuario autenticado creando producto: " + username);

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        // Convertir imagen a Base64
        String imageBase64 = image != null ? Base64.getEncoder().encodeToString(image.getBytes()) : null;

        // Crear y guardar el producto
        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setImage(imageBase64);
        product.setPrice(price);
        product.setTax(tax);
        product.setCurrency(com.tienda.app.enums.Currency.valueOf(currency));
        product.setSeller(user); // ✅ Asignar correctamente el vendedor

        Product savedProduct = productRepository.save(product);

        // 🔥 Verificar que el vendedor se guarda bien
        System.out.println("Producto guardado con vendedor: " + savedProduct.getSeller().getUsername());

        return savedProduct;
    }


    // 🔍 Obtener productos por usuario
    public List<Product> getProductsBySeller(String username) {
        return productRepository.findBySellerUsername(username);
    }

    // 🔍 Buscar productos por nombre
    public List<Product> searchProductsByName(String name) {
        return productRepository.findByNameContainingIgnoreCase(name);
    }

    // 🔄 Modificar producto
    public Product updateProduct(Long id, String name, String description, MultipartFile image,
                                 BigDecimal price, double tax, String currency) throws IOException {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("❌ Producto no encontrado"));

        product.setName(name);
        product.setDescription(description);
        if (image != null && !image.isEmpty()) {
            product.setImage(Base64.getEncoder().encodeToString(image.getBytes()));
        }
        product.setPrice(price);
        product.setTax(tax);
        product.setCurrency(com.tienda.app.enums.Currency.valueOf(currency));

        return productRepository.save(product);
    }

    // ❌ Eliminar producto
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new IllegalArgumentException("❌ El producto no existe");
        }
        productRepository.deleteById(id);
    }
}
