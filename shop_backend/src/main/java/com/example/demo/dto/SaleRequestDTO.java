package com.example.demo.dto;

public class SaleRequestDTO {
    private String name;
    private Integer quantity;
    private float unitPrice;

    // getters
    public String getName() { return name; }
    public Integer getQuantity() { return quantity; }
    public float getUnitPrice() { return unitPrice; }

    // setters (required for Jackson)
    public void setName(String name) { this.name = name; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    public void setUnitPrice(float unitPrice) { this.unitPrice = unitPrice; }
}