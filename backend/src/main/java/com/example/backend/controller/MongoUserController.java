package com.example.backend.controller;

import com.example.backend.model.MongoUserRequest;
import com.example.backend.model.MongoUserResponse;
import com.example.backend.service.MongoUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class MongoUserController {
    private final MongoUserDetailsService mongoUserDetailsService;
    @PostMapping
    public MongoUserResponse signup(@RequestBody MongoUserRequest user) {
        return mongoUserDetailsService.signup(user);
    }
    @PostMapping("/login")
    public MongoUserResponse login(Principal principal) {
        return getMe(principal);
    }
    @GetMapping("/me")
    public MongoUserResponse getMe(Principal principal) {
        return mongoUserDetailsService.getMe(principal);
    }
    @PostMapping("/logout")
    public void logout() {
        // this method exists only to define the endpoint!
    }

}
