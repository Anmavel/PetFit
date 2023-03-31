package com.example.backend.repository;

import com.example.backend.model.Supply;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplyRepo extends MongoRepository<Supply,String> {

}
