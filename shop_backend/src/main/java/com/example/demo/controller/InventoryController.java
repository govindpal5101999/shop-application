package com.example.demo.controller;

import com.example.demo.entity.PurchaseItem;
import com.example.demo.projection.InventoryView;
import com.example.demo.projection.PublicProductView;
import com.example.demo.repository.PurchaseItemRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.example.demo.dto.PurchaseResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.example.demo.service.PurchaseService;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class InventoryController {

    @Autowired
    private PurchaseItemRepository purchaseRepo;

    @Autowired
    private PurchaseService purchaseService;

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

        Map<String, Object> response =
                purchaseService.createProduct(image, datalist);

        return ResponseEntity.ok(response);
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

    // Get all bills
    @GetMapping("/bills")
    public List<PurchaseResponseDTO> getAllBills() {
        return purchaseService.getAllBills();
    }

    // Get bill by bill number
    @GetMapping("/bill/{billNumber}")
    public PurchaseResponseDTO getBillByNumber(@PathVariable String billNumber) {
        return purchaseService.getBillByNumber(billNumber);
    }
}