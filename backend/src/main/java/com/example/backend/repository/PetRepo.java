package com.example.backend.repository;

import com.example.backend.model.Pet;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PetRepo extends MongoRepository<Pet,String> {
    List<Pet> findPetsByUserId(String userId);

}
