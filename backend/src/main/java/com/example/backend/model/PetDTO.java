package com.example.backend.model;

import java.util.List;

public record PetDTO(String name,
                     List<String> nameOfBreed,
                     String photo,
                     List<Supply> supplies) {

}
