package com.example.backend.exception;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class PetNotFoundException extends RuntimeException {

    public PetNotFoundException(String message) {

        super(message);
    }
}
