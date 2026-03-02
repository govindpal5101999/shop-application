package com.example.demo.controller;

import com.example.demo.dto.SaleRequestDTO;
import com.example.demo.dto.SaleResponseDTO;
import com.example.demo.projection.TopSellingView;
import com.example.demo.service.SaleService;
import com.example.demo.repository.SaleItemRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// @CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/sales")
public class SaleController {

    @Autowired
    private SaleService saleService;

    @PostMapping
    public ResponseEntity<SaleResponseDTO> createSale(
            @RequestBody List<SaleRequestDTO> sales) {

        SaleResponseDTO response = saleService.createSale(sales);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/top-selling")
    public List<TopSellingView> getTopSellingProducts() {
        return saleService.getTop5SellingProducts();
    }
}