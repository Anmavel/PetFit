package com.example.backend.service;

import com.example.backend.model.Pet;
import com.example.backend.repository.PetRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PetService {
    private final PetRepo petRepo;
    private final IdService idService;
    public Pet addPet(Pet newPet){
        if(newPet.name()==null ||newPet.name().equals("")){
            throw new IllegalArgumentException("missing name");
        }
        String id = idService.generateId();
        Pet newPetWithId = new Pet(id,newPet.name(),newPet.nameOfBreed(), newPet.photo(),newPet.Supplies());
        return petRepo.save(newPetWithId);

    }

}
