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

    public String generateBillNumber() {
        return "BILL" + System.currentTimeMillis();
    }

    public SaleResponseDTO createSale(List<SaleRequestDTO> sales) {

        String billNumber = generateBillNumber();

        Sale sale = new Sale();
        sale.setBillNumber(billNumber);
        sale.setSaleDate(new Timestamp(System.currentTimeMillis()));

        BigDecimal totalAmount = BigDecimal.ZERO;
        List<SaleItem> saleItems = new ArrayList<>();

        // 🔐 Load inventory once
        List<InventoryView> inventoryList =
                purchaseItemRepository.getInventorySummary();

        for (SaleRequestDTO saleDTO : sales) {

            InventoryView inventory = inventoryList.stream()
                    .filter(i -> i.getName().equals(saleDTO.getName()))
                    .findFirst()
                    .orElseThrow(() ->
                        new RuntimeException("Product not found: " + saleDTO.getName())
                    );

            // ✅ STOCK VALIDATION (CORRECT)
            if (saleDTO.getQuantity() > inventory.getAvailableQty()) {
                throw new RuntimeException(
                        "Insufficient stock for " + saleDTO.getName()
                        + ". Available: " + inventory.getAvailableQty()
                );
            }

            BigDecimal lineTotal =
                    BigDecimal.valueOf(saleDTO.getUnitPrice())
                              .multiply(BigDecimal.valueOf(saleDTO.getQuantity()));

            totalAmount = totalAmount.add(lineTotal);

            SaleItem saleItem = new SaleItem();
            saleItem.setItemName(saleDTO.getName());
            saleItem.setQuantity(saleDTO.getQuantity());
            saleItem.setPrice(lineTotal);

            saleItems.add(saleItem);
        }

        sale.setTotalAmount(totalAmount);
        sale = saleRepository.save(sale);

        for (SaleItem item : saleItems) {
            item.setSale(sale);
            saleItemRepository.save(item);
        }

        List<SaleResponseDTO.ItemDTO> itemDTOs = new ArrayList<>();
        for (SaleItem item : saleItems) {
            itemDTOs.add(
                new SaleResponseDTO.ItemDTO(
                    item.getItemName(),
                    item.getQuantity(),
                    item.getPrice()
                )
            );
        }

        return new SaleResponseDTO(billNumber, itemDTOs);
    }

    public List<TopSellingView> getTop5SellingProducts() {
    return saleItemRepository.getTop5SellingProducts();
}
}