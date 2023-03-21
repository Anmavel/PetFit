package com.example.backend.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Document("pets")
public record Pet(
        @Id
        String id,
        String name,
        String nameOfBreed,
        String photo,
        String[] Supplies) {
}
