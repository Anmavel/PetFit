package com.example.backend.controller;

import com.example.backend.model.Pet;
import com.example.backend.model.PetDTO;
import com.example.backend.service.PetService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/pets/")
public class PetController {
    private final PetService petService;
    @GetMapping
    public List<Pet> getAllPets(){ return petService.getAllPets();}
    @PostMapping
    public Pet addPet(@RequestBody PetDTO pet, Principal principal){
        return petService.addPet(pet,principal);
    }
    @GetMapping("{id}")
    public Pet getPetById(@PathVariable String id){
        return petService.getPetById(id);
    }
    @PutMapping("{id}")
    public Pet updatePet(@PathVariable String id, @RequestBody PetDTO pet, Principal principal){
        return petService.updatePet(id,pet,principal);
    }
    @DeleteMapping("{id}")
    public Pet deleteTaskById(@PathVariable String id,Principal principal) {
        return petService.deletePet(id,principal);
    }

}
