package com.example.backend.model;

public record PetDTO( String name,
                      String nameOfBreed,
                      String photo,
                      String[] supplies) {
}
