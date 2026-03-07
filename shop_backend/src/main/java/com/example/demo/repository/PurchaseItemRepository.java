package com.example.demo.repository;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

//import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.demo.entity.PurchaseItem;
import com.example.demo.projection.InventoryView;
import com.example.demo.projection.PublicProductView;

@Repository
public interface PurchaseItemRepository extends JpaRepository<PurchaseItem, Integer>{
	
    List<PurchaseItem> findByDate(Date date);

    PurchaseItem findByNameIgnoreCase(String name);

    // Purchase findByBillNumber(String billNumber);

    @Query(value = """
    SELECT 
        p.id AS id,
        p.name AS name,
        p.total_purchased AS purchasedQty,
        COALESCE(s.total_sold, 0) AS soldQty,
        (p.total_purchased - COALESCE(s.total_sold, 0)) AS availableQty,
        p.unitPrice AS unitPrice,
        p.image AS image
    FROM (
        SELECT 
            MIN(id) AS id,
            name,
            SUM(quantity) AS total_purchased,
            MAX(unitprice) AS unitPrice,
            MAX(replace(encode(pic_byte, 'base64'), E'\\n', '')) AS image
        FROM Purchase
        GROUP BY name
    ) p
    LEFT JOIN (
        SELECT 
            item_name,
            SUM(quantity) AS total_sold
        FROM sale_item
        GROUP BY item_name
    ) s ON s.item_name = p.name
""", nativeQuery = true)
List<InventoryView> getInventorySummary();

@Query(value = """
    SELECT 
        p.id AS id,
        p.name AS name,
        (p.total_purchased - COALESCE(s.total_sold, 0)) AS availableQty,
        p.unitPrice AS unitPrice,
        p.image AS image
    FROM (
        SELECT 
            MIN(id) AS id,
            name,
            SUM(quantity) AS total_purchased,
            MAX(unitprice) AS unitPrice,
            MAX(replace(encode(pic_byte, 'base64'), E'\\n', '')) AS image
        FROM Purchase
        GROUP BY name
    ) p
    LEFT JOIN (
        SELECT 
            item_name,
            SUM(quantity) AS total_sold
        FROM sale_item
        GROUP BY item_name
    ) s ON s.item_name = p.name
""", nativeQuery = true)
List<PublicProductView> getPublicProducts();


}


