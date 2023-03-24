package com.example.backend.model;

import java.util.List;

public record PetDTO(String name,
                     String nameOfBreed,
                     String photo,
                     List<String> supplies) {

}
