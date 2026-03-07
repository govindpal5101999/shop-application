package com.example.demo.dto;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

public class SaleResponseDTO {

    private String number;
    private Timestamp saleDate; // ✅ add this
    private BigDecimal totalAmount; // ✅ add this
    private List<ItemDTO> items;

    public SaleResponseDTO(String number, Timestamp saleDate, BigDecimal totalAmount, List<ItemDTO> items) {
        this.number = number;
        this.saleDate = saleDate;
        this.totalAmount = totalAmount;
        this.items = items;
    }

    public String getNumber() {
        return number;
    }

    public Timestamp getSaleDate() {
        return saleDate;
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