package com.example.backend.exception;

import lombok.NoArgsConstructor;


@NoArgsConstructor
public class SupplyNotFoundException extends RuntimeException {
    public SupplyNotFoundException(String message) {
        super(message);
    }
}




