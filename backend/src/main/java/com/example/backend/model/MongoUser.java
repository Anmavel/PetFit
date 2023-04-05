package com.example.backend.model;

public record MongoUser(
        String id,
        String username,
        String password,
        String role) {
}
