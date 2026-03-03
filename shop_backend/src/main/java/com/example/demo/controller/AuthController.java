package com.example.demo.controller;

import com.example.demo.entity.AppUser;
import com.example.demo.entity.Role;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import com.example.demo.dto.LoginRequestDTO;
import com.example.demo.dto.LoginResponseDTO;
import org.springframework.http.HttpStatus;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody AppUser user) {

        // Check if the username already exists
        if (userRepository.existsByUsername(user.getUsername())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                                 .body("Username already exists!");  // Correctly return a String response
        }

        // If the user doesn't exist, hash the password and set the role if it's null
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        if (user.getRole() == null) {
            user.setRole(Role.CUSTOMER); // Default role if none provided
        }

        // Save the new user
        userRepository.save(user);

        // Return success message
        return ResponseEntity.status(HttpStatus.CREATED) // 201 Created status
                             .body("User registered successfully!");  // Correctly return a String response
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO loginRequest) {

        // Retrieve user from the database
        AppUser user = userRepository.findByUsername(loginRequest.getUsername())
            .orElse(null);

        // Validate user credentials
        if (user == null || !passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                 .body(new LoginResponseDTO("Invalid username or password", null)); // Role should be null in case of failure
        }

        // Return success message with role as String
        LoginResponseDTO response = new LoginResponseDTO("Login successful!", user.getRole().name());  // Convert Role to String using .name()
        return ResponseEntity.ok(response);
    }


}