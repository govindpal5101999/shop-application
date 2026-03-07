package com.example.demo.dto;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

public class PurchaseResponseDTO {

    private String number;
    private Timestamp purchaseDate;
    private BigDecimal totalAmount;
    private List<ItemDTO> items;

    public PurchaseResponseDTO(String number, Timestamp purchaseDate,
                               BigDecimal totalAmount, List<ItemDTO> items) {
        this.number = number;
        this.purchaseDate = purchaseDate;
        this.totalAmount = totalAmount;
        this.items = items;
    }

    public String getNumber() {
        return number;
    }

    public Timestamp getPurchaseDate() {
        return purchaseDate;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public List<ItemDTO> getItems() {
        return items;
    }

    public static class ItemDTO {
        private String name;
        private long quantity;
        private BigDecimal price;

        public ItemDTO(String name, long quantity, BigDecimal price) {
            this.name = name;
            this.quantity = quantity;
            this.price = price;
        }

        public String getName() {
            return name;
        }

        public long getQuantity() {
            return quantity;
        }

        public BigDecimal getPrice() {
            return price;
        }
    }
}