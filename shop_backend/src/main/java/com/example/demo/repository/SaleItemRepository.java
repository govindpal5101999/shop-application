package com.example.demo.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.demo.entity.SaleItem;
import com.example.demo.projection.TopSellingView;

public interface SaleItemRepository extends JpaRepository<SaleItem, Long> {
    SaleItem findByItemName(String name);

    @Query(value = """
        SELECT 
            s.item_name AS name,
            SUM(s.quantity) AS totalSold,
            MAX(replace(encode(p.pic_byte, 'base64'), E'\n', '')) AS image,
            MAX(s.price) AS price
        FROM Sale s
        JOIN Purchase p ON p.name = s.item_name
        GROUP BY s.item_name
        ORDER BY totalSold DESC
        LIMIT 5
    """, nativeQuery = true)
    List<TopSellingView> getTop5SellingProducts();
}