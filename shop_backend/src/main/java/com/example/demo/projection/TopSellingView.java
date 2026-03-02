package com.example.demo.projection;

import java.math.BigDecimal;

public interface TopSellingView {
    String getName();
    Long getTotalSold();
    String getImage();
    BigDecimal getPrice(); ;
}