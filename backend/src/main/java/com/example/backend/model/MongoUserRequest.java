package com.example.backend.model;

public record MongoUserRequest(
        String username,
        String password) {
}
