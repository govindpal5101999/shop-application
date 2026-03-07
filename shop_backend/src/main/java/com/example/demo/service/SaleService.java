package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import com.example.demo.repository.SaleRepository;
import com.example.demo.repository.SaleItemRepository;
import com.example.demo.repository.PurchaseItemRepository;
import com.example.demo.dto.SaleRequestDTO;
import com.example.demo.dto.SaleResponseDTO;
import com.example.demo.entity.Sale;
import com.example.demo.entity.SaleItem;
import com.example.demo.entity.PurchaseItem;
import com.example.demo.projection.InventoryView;
import com.example.demo.projection.TopSellingView;

@Service
public class SaleService {

    @Autowired
    private SaleRepository saleRepository;

    @Autowired
    private SaleItemRepository saleItemRepository;

    @Autowired
    private PurchaseItemRepository purchaseItemRepository;

    public List<Sale> getAllSales() {
    return saleRepository.findAll();
    }

    public List<SaleResponseDTO> getAllSalesDTO() {
        List<Sale> sales = saleRepository.findAll();
        List<SaleResponseDTO> saleDTOs = new ArrayList<>();
    
for (Sale sale : sales) {
    if (sale.getSaleItems().isEmpty()) continue; // skip sales with no items

    List<SaleResponseDTO.ItemDTO> items = new ArrayList<>();
    for (SaleItem item : sale.getSaleItems()) {
        items.add(new SaleResponseDTO.ItemDTO(
            item.getItemName(),
            item.getQuantity(),
            item.getPrice()
        ));
    }
    saleDTOs.add(new SaleResponseDTO(
            sale.getBillNumber(),
            sale.getSaleDate(),
            sale.getTotalAmount(), 
            items
            ));
}
    
        return saleDTOs;
    }

    public SaleResponseDTO getSaleByBillNumber(String billNumber) {
        Sale sale = saleRepository.findByBillNumber(billNumber);

        if (sale == null) {
        return null; // Controller can handle the 404
        }

        List<SaleResponseDTO.ItemDTO> items = new ArrayList<>();
        for (SaleItem item : sale.getSaleItems()) {
        items.add(new SaleResponseDTO.ItemDTO(
            item.getItemName(),
            item.getQuantity(),
            item.getPrice()
        ));
        }

        return new SaleResponseDTO(
            sale.getBillNumber(),
            sale.getSaleDate(),      
            sale.getTotalAmount(),  
            items
            );
    }

    public String generateBillNumber() {
        return "BILL" + System.currentTimeMillis();
    }

    public SaleResponseDTO createSale(List<SaleRequestDTO> sales) {

    String billNumber = generateBillNumber();

    // Create sale and set timestamp manually
    Sale sale = new Sale();
    sale.setBillNumber(billNumber);
    sale.setTotalAmount(BigDecimal.ZERO);
    sale.setSaleDate(new Timestamp(System.currentTimeMillis()));
    List<SaleItem> saleItems = new ArrayList<>();
    BigDecimal totalAmount = BigDecimal.ZERO;

    // Load inventory once
    List<InventoryView> inventoryList = purchaseItemRepository.getInventorySummary();

    for (SaleRequestDTO saleDTO : sales) {
        InventoryView inventory = inventoryList.stream()
            .filter(i -> i.getName().equals(saleDTO.getName()))
            .findFirst()
            .orElseThrow(() -> new RuntimeException("Product not found: " + saleDTO.getName()));

        if (saleDTO.getQuantity() > inventory.getAvailableQty()) {
            throw new RuntimeException(
                "Insufficient stock for " + saleDTO.getName()
                + ". Available: " + inventory.getAvailableQty()
            );
        }

        BigDecimal lineTotal = BigDecimal.valueOf(saleDTO.getUnitPrice())
                                     .multiply(BigDecimal.valueOf(saleDTO.getQuantity()));
        totalAmount = totalAmount.add(lineTotal);

        SaleItem saleItem = new SaleItem();
        saleItem.setItemName(saleDTO.getName());
        saleItem.setQuantity(saleDTO.getQuantity());
        saleItem.setPrice(lineTotal);
        saleItem.setSale(sale); // link to parent

        saleItems.add(saleItem);
    }

    sale.setTotalAmount(totalAmount);
    sale.setSaleItems(saleItems);

    // Save sale + items in one shot using cascade
    sale = saleRepository.save(sale); // Do NOT save SaleItems individually

    // Prepare response DTO
    List<SaleResponseDTO.ItemDTO> itemDTOs = saleItems.stream()
        .map(item -> new SaleResponseDTO.ItemDTO(item.getItemName(), item.getQuantity(), item.getPrice()))
        .toList();

    return new SaleResponseDTO(billNumber,
        sale.getSaleDate(),       
        sale.getTotalAmount(),  
        itemDTOs);
}

    public List<TopSellingView> getTop5SellingProducts() {
    return saleItemRepository.getTop5SellingProducts();
}
}