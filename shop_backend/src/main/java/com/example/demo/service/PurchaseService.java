package com.example.demo.service;

import com.example.demo.dto.PurchaseResponseDTO;
import com.example.demo.entity.Purchase;
import com.example.demo.entity.PurchaseItem;
import com.example.demo.repository.PurchaseItemRepository;
import com.example.demo.repository.PurchaseRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.*;

@Service
public class PurchaseService {

    @Autowired
    private PurchaseItemRepository purchaseItemRepository;

    @Autowired
    private PurchaseRepository purchaseRepository;

    private final ObjectMapper mapper = new ObjectMapper();

    // Generate Bill Number
    public String generateBillNumber() {
        return "PBILL" + System.currentTimeMillis();
    }

    // Parse JSON from Angular form
    private PurchaseItem parseJsonToPurchaseItem(String datalist) {
        try {
            return mapper.readValue(datalist, PurchaseItem.class);
        } catch (Exception e) {
            throw new RuntimeException("Invalid JSON data", e);
        }
    }

    // ⭐ MAIN METHOD CALLED BY YOUR ANGULAR COMPONENT
    @Transactional
    public Map<String, Object> createProduct(MultipartFile image, String datalist) {

        try {

            PurchaseItem item = parseJsonToPurchaseItem(datalist);

            // Save image
            if (image != null) {
                item.setPicByte(image.getBytes());
            }

            // Calculate total
            Float lineTotal = item.getUnitprice() * item.getQuantity();
            item.setTotalamount(lineTotal);

            // Save purchase item
            purchaseItemRepository.save(item);

            // ⭐ Create bill internally
            List<PurchaseItem> items = new ArrayList<>();
            items.add(item);

            PurchaseResponseDTO bill = createPurchase(items);

            Map<String, Object> result = new HashMap<>();
            result.put("message", "Product saved successfully");
            result.put("billNumber", bill.getNumber());

            return result;

        } catch (Exception e) {
            throw new RuntimeException("Error saving product", e);
        }
    }

    // ⭐ BILL CREATION LOGIC
    public PurchaseResponseDTO createPurchase(List<PurchaseItem> items) {

        String billNumber = generateBillNumber();

        Purchase purchase = new Purchase();
        purchase.setBillNumber(billNumber);
        purchase.setPurchaseDate(new Timestamp(System.currentTimeMillis()));

        List<PurchaseItem> purchaseItems = new ArrayList<>();
        BigDecimal totalAmount = BigDecimal.ZERO;

        for (PurchaseItem item : items) {

            Float lineTotal = item.getUnitprice() * item.getQuantity();

            item.setTotalamount(lineTotal);
            item.setPurchase(purchase);

            totalAmount = totalAmount.add(BigDecimal.valueOf(lineTotal));

            purchaseItems.add(item);
        }

        purchase.setTotalAmount(totalAmount);
        purchase.setPurchaseItems(purchaseItems);

        purchase = purchaseRepository.save(purchase);

        List<PurchaseResponseDTO.ItemDTO> itemDTOs = new ArrayList<>();

        for (PurchaseItem i : purchaseItems) {
            itemDTOs.add(new PurchaseResponseDTO.ItemDTO(
                    i.getName(),
                    i.getQuantity(),
                    BigDecimal.valueOf(i.getTotalamount())
            ));
        }

        return new PurchaseResponseDTO(
                billNumber,
                purchase.getPurchaseDate(),
                purchase.getTotalAmount(),
                itemDTOs
        );
    }

    // ⭐ GET ALL BILLS
    public List<PurchaseResponseDTO> getAllBills() {

        List<Purchase> purchases = purchaseRepository.findAll();
        List<PurchaseResponseDTO> response = new ArrayList<>();

        for (Purchase purchase : purchases) {

            List<PurchaseResponseDTO.ItemDTO> items = new ArrayList<>();

            for (PurchaseItem item : purchase.getPurchaseItems()) {
                items.add(new PurchaseResponseDTO.ItemDTO(
                        item.getName(),
                        item.getQuantity(),
                        BigDecimal.valueOf(item.getTotalamount())
                ));
            }

            response.add(new PurchaseResponseDTO(
                    purchase.getBillNumber(),
                    purchase.getPurchaseDate(),
                    purchase.getTotalAmount(),
                    items
            ));
        }

        return response;
    }

    // ⭐ GET BILL BY BILL NUMBER
    public PurchaseResponseDTO getBillByNumber(String billNumber) {

        Purchase purchase = purchaseRepository.findByBillNumber(billNumber);

        if (purchase == null) {
            throw new RuntimeException("Bill not found");
        }

        List<PurchaseResponseDTO.ItemDTO> items = new ArrayList<>();

        for (PurchaseItem item : purchase.getPurchaseItems()) {
            items.add(new PurchaseResponseDTO.ItemDTO(
                    item.getName(),
                    item.getQuantity(),
                    BigDecimal.valueOf(item.getTotalamount())
            ));
        }

        return new PurchaseResponseDTO(
                purchase.getBillNumber(),
                purchase.getPurchaseDate(),
                purchase.getTotalAmount(),
                items
        );
    }
}