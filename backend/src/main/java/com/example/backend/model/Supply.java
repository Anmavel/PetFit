package com.example.backend.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("supplies")
public record Supply(
        @Id
        String id,
        String nameItem,
        boolean bought,
        String petId
        ) {

}