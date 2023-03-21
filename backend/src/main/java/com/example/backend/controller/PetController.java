package com.example.backend.controller;

import com.example.backend.model.Pet;
import com.example.backend.model.PetDTO;
import com.example.backend.service.PetService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/pets/")
public class PetController {
    private final PetService petService;

    @PostMapping
    public Pet addPet(@RequestBody PetDTO pet){
        return petService.addPet(pet);
    }

}
