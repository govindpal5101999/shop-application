package com.example.demo.dto;

import java.util.List;
import java.math.BigDecimal;

public class SaleResponseDTO {

    private String number;
    private List<ItemDTO> items;

    public SaleResponseDTO(String number, List<ItemDTO> items) {
        this.number = number;
        this.items = items;
    }

    public String getNumber() {
        return number;
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