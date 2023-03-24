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

    @PostMapping
    public Pet addPet(@RequestBody PetDTO pet){
        return petService.addPet(pet);
    }
    @DeleteMapping("{id}")
    public List<Pet> deleteTaskById(@PathVariable String id) {
        return petService.deletePet(id);
    }



}
