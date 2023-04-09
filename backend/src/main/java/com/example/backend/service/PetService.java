package com.example.backend.service;

import com.example.backend.exception.PetNotFoundException;
import com.example.backend.exception.UnauthorizedException;
import com.example.backend.model.Pet;
import com.example.backend.model.PetDTO;
import com.example.backend.repository.PetRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.security.Principal;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PetService {
    private final PetRepo petRepo;
    private final IdService idService;
    private final MongoUserDetailsService mongoUserDetailsService;
    public List<Pet> getAllPets(Principal principal){ return petRepo.findPetByUserId(mongoUserDetailsService.getMe(principal).id());}

    public Pet addPet(PetDTO newPet, Principal principal){
        if(newPet.name()==null || newPet.name().equals("")){
            throw new IllegalArgumentException("Pet name is missing or empty");
        }
        String id = idService.generateId();
        Pet newPetWithId = new Pet(id,newPet.name(),newPet.nameOfBreed(), newPet.photo(),newPet.supplies(),mongoUserDetailsService.getMe(principal).id());
        return petRepo.save(newPetWithId);

    }
    public Pet getPetById(String id){
        return petRepo.findById(id).orElseThrow(PetNotFoundException::new);
    }
    public Pet updatePet(String id, PetDTO pet, Principal principal) {
        String userId= mongoUserDetailsService.getMe(principal).id();
        Optional<Pet> optionalPet =petRepo.findById(id);
        if(optionalPet.isEmpty()){
            throw new PetNotFoundException("Pet with Id: " +id + " doesn't exist");
        }
        if(!optionalPet.get().userId().equals(userId)){
            throw new UnauthorizedException("You are only allowed to update your own pets");

        }
        Pet updatedPet=new Pet(id, pet.name(),pet.nameOfBreed(), pet.photo(), pet.supplies(), userId);
        return petRepo.save(updatedPet);
    }

    public Pet deletePet(String id, Principal principal) {
        Optional<Pet> optionalPet =petRepo.findById(id);
        String userId= mongoUserDetailsService.getMe(principal).id();
        if (optionalPet.isEmpty()){
            throw new PetNotFoundException("Pet with id"+ id+ "doesn't exist");
        }
        if(!optionalPet.get().userId().equals(userId)){
            throw new UnauthorizedException("You are only allowed to delete your own pets");

        }
        petRepo.deleteById(id);
        return optionalPet.get();
        }


}
