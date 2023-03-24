package com.example.backend.exception;

public class PetNotFoundException extends RuntimeException {
    public PetNotFoundException(){

        super("Current Pet not found");
    }

    public PetNotFoundException(String message) {

        super(message);
    }
}
