package com.example.demo;


import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.servlet.ServletContext;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class WindController {

	@Autowired
	windRepository windRepo;
	
	@Autowired
	ServletContext context;
	
	@GetMapping("/store")
	public List<wind> getAllWinds(){
		return windRepo.findAll();
	}
	
	
	@GetMapping("/store/{id}")
	public ResponseEntity<wind> getwindById(@PathVariable("id") Integer id){
		Optional<wind> store = windRepo.findById(id);
		
		if(store.isPresent()) {
			return new ResponseEntity<>(store.get(), HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/store/getDate/{date}")
	public ResponseEntity<List<wind>> getwindByDateTime(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date){

		try {
			List<wind> dataList = windRepo.findByDate(date);
			if(dataList.isEmpty()) {
				return new ResponseEntity<>(dataList, HttpStatus.NO_CONTENT);
			}
			
			return new ResponseEntity<>(windRepo.findByDate(date), HttpStatus.OK);
			
		}catch(Exception e) {
				return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
			}
	
	}
	
	@GetMapping("/store/top/{date}")
	public ResponseEntity<List<wind>> getByDateAndStatus(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date){

		try {
			List<wind> dataList = windRepo.findByDateAndStatus(date);
			if(dataList.isEmpty()) {
				return new ResponseEntity<>(dataList, HttpStatus.NO_CONTENT);
			}
			
			return new ResponseEntity<>(windRepo.findByDateAndStatus(date), HttpStatus.OK);
			
		}catch(Exception e) {
				return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
			}
	
	}
	
	@GetMapping("/store/getStatus/{status}")
	public ResponseEntity<List<wind>> getUnpaidStatus(@PathVariable("status") String status){

		try {
			List<wind> dataList = windRepo.findByStatus(status);
			if(dataList.isEmpty()) {
				return new ResponseEntity<>(dataList, HttpStatus.NO_CONTENT);
			}		
			return new ResponseEntity<>(windRepo.findByStatus(status), HttpStatus.OK);
			
		}catch(Exception e) {
				return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
			}
	
	}
	
	
	
	@PostMapping("/store")
	public wind createData (@RequestParam("file") MultipartFile image, @RequestParam("datalist") String datalist) throws JsonParseException , JsonMappingException, Exception{
		
		wind store = new ObjectMapper().readValue(datalist, wind.class);
		byte[] fileName = image.getBytes();
		store.setPicByte(fileName);
		return windRepo.save(store);
	}
	
	

	@PutMapping("/store/update/{id}")
	public wind updateStore(@PathVariable("id") Integer id,@RequestParam("file") MultipartFile image, @RequestParam("datalist") String datalist) throws JsonParseException, JsonMappingException, Exception {
		Integer updateId = id;
		wind store = new ObjectMapper().readValue(datalist ,wind.class);
		byte[] fileName = image.getBytes();
		store.setPicByte(fileName);
		store.setId(updateId);
		return windRepo.save(store);	
	}
	 

	
	@DeleteMapping("/store/{id}")
	public ResponseEntity<HttpStatus> deleteTutorial(@PathVariable("id") Integer id) {
		try {
			windRepo.deleteById(id);
			return new ResponseEntity<>(HttpStatus.ACCEPTED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	


	@DeleteMapping("/store")
	public ResponseEntity<HttpStatus> deleteAllTutorials() {
		try {
			windRepo.deleteAll();
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	
	
}
