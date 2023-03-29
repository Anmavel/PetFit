package com.example.backend.controller;

import com.example.backend.model.Pet;
import com.example.backend.model.PetDTO;
import com.example.backend.service.PetService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/pets/")
public class PetController {
    private final PetService petService;
    @GetMapping
    public List<Pet> getAllPets(){ return petService.getAllPets();}
    @PostMapping
    public Pet addPet(@RequestBody PetDTO pet){
        return petService.addPet(pet);
    }
    @GetMapping("{id}")
    public Pet getPetById(@PathVariable String id){
        return petService.getPetById(id);
    }
    @PutMapping("{id}")
    public Pet updatePet(@PathVariable String id, @RequestBody PetDTO pet){
        return petService.updatePet(id,pet);
    }
    @DeleteMapping("{id}")
    public List<Pet> deleteTaskById(@PathVariable String id) {
        return petService.deletePet(id);
    }



}
