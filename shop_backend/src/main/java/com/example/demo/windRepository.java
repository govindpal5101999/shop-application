package com.example.demo;


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


@Repository
public interface windRepository extends JpaRepository<wind, Integer>{
	
	@Query( value = "SELECT * FROM storedata WHERE date=?", nativeQuery = true)
	List<wind> findByDate(Date date);
	
	@Query( value = "SELECT * FROM storedata WHERE status= ?", nativeQuery = true)
	List<wind> findByStatus(String status);
	
	@Query( value = "SELECT * FROM storedata WHERE date =? AND status ='Sale' ORDER BY quantity DESC LIMIT 5",  nativeQuery = true)
	List<wind> findByDateAndStatus(Date date);

}


