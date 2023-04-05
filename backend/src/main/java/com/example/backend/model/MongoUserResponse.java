package com.example.backend.model;

public record MongoUserResponse(
        String id,
        String username,
        String role) {
}
