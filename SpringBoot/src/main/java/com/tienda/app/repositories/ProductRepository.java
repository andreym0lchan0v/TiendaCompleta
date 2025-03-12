package com.tienda.app.repositories;

import com.tienda.app.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findBySellerUsername(String username);
    List<Product> findByNameContainingIgnoreCase(String name);
}
