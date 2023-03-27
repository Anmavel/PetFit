package com.example.backend.service;

import com.example.backend.exception.PetNotFoundException;
import com.example.backend.model.Pet;
import com.example.backend.model.PetDTO;
import com.example.backend.repository.PetRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PetService {
    private final PetRepo petRepo;
    private final IdService idService;
    public List<Pet> getAllPets(){ return petRepo.findAll();}

    public Pet addPet(PetDTO newPet){
        if(newPet.name()==null || newPet.name().equals("")){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Pet name is missing or empty");
        }
        String id = idService.generateId();
        Pet newPetWithId = new Pet(id,newPet.name(),newPet.nameOfBreed(), newPet.photo(),newPet.supplies());
        return petRepo.save(newPetWithId);

    }

    public List<Pet> deletePet(String id) {
        Optional<Pet> optionalPet =petRepo.findById(id);
        if (optionalPet.isEmpty()){
            throw new PetNotFoundException("Pet with id"+ id+ "doesn't exist");
        }
        petRepo.deleteById(id);
        return petRepo.findAll();
        }
}
