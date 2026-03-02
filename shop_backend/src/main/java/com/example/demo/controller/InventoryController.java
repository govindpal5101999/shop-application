package com.example.demo.controller;

import com.example.demo.entity.PurchaseItem;
import com.example.demo.projection.InventoryView;
import com.example.demo.projection.PublicProductView;
import com.example.demo.repository.PurchaseItemRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class InventoryController {

    @Autowired
    private PurchaseItemRepository purchaseRepo;

    @GetMapping
    public List<PurchaseItem> getAllProducts() {
        return purchaseRepo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PurchaseItem> getProduct(@PathVariable Integer id) {
        Optional<PurchaseItem> item = purchaseRepo.findById(id);
        return item.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createProduct(
            @RequestParam(value = "file", required = false) MultipartFile image,
            @RequestParam("datalist") String datalist) {

        try {
            PurchaseItem product =
                    new ObjectMapper().readValue(datalist, PurchaseItem.class);

            String normalizedName = product.getName().trim().toLowerCase();
            product.setName(normalizedName);

            PurchaseItem existing =
                    purchaseRepo.findByNameIgnoreCase(normalizedName);

            if (existing != null) {

                existing.setQuantity(existing.getQuantity() + product.getQuantity());
                existing.setUnitprice(product.getUnitprice());
                existing.setTotalamount(
                        existing.getUnitprice() * existing.getQuantity()
                );

                purchaseRepo.save(existing);

                return ResponseEntity.ok(
                        Map.of("success", true, "message", "Quantity updated")
                );
            }

            if (image != null && !image.isEmpty()) {
                product.setPicByte(image.getBytes());
            }

            purchaseRepo.save(product);

            return ResponseEntity.ok(
                    Map.of("success", true, "message", "Product created")
            );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("success", false, "message", "Error occurred"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Integer id) {
        purchaseRepo.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/inventory")
    public List<InventoryView> getInventorySummary() {
        return purchaseRepo.getInventorySummary();
    }

    @GetMapping("/inventory/public")
    public List<PublicProductView> getPublicProducts() {
        return purchaseRepo.getPublicProducts();
    }
}