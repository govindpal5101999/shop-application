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

@Query(value = """
    SELECT 
        p.id AS id,
        p.name AS name,
        SUM(p.quantity) AS purchasedQty,
        COALESCE(SUM(s.quantity), 0) AS soldQty,
        (SUM(p.quantity) - COALESCE(SUM(s.quantity), 0)) AS availableQty,
        MAX(p.unitprice) AS unitPrice,
        MAX(replace(encode(p.pic_byte, 'base64'), E'\n', '')) AS image
    FROM Purchase  p
    LEFT JOIN Sale s ON s.item_name = p.name
    GROUP BY p.id, p.name
""", nativeQuery = true)
List<InventoryView> getInventorySummary();

@Query(value = """
    SELECT 
        p.id AS id,
        p.name AS name,
        (SUM(p.quantity) - COALESCE(SUM(s.quantity), 0)) AS availableQty,
        MAX(p.unitprice) AS unitPrice,
        MAX(replace(encode(p.pic_byte, 'base64'), E'\n', '')) AS image
    FROM Purchase p
    LEFT JOIN Sale s ON s.item_name = p.name
    GROUP BY p.id, p.name
""", nativeQuery = true)
List<PublicProductView> getPublicProducts();


}


