package com.example.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class OnlineOrderController {

    @PostMapping
    public ResponseEntity<?> placeOrder() {
        return ResponseEntity.ok("Order placed successfully");
    }

    @GetMapping("/my-orders")
    public ResponseEntity<?> getUserOrders() {
        return ResponseEntity.ok("User orders list");
    }
}