package com.example.demo.projection;

public interface InventoryView {

    Integer getId();
    String getName();
    Long getPurchasedQty();
    Long getSoldQty();
    Long getAvailableQty();
    Double getUnitPrice();
    String getImage(); 
}