package com.example.backend.service;

import com.example.backend.model.Pet;
import com.example.backend.repository.PetRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PetServiceTest {

    PetRepo petRepo;
    PetService petService;
    IdService idService;
    Pet pet1;

    @BeforeEach
    void setUp(){
        petRepo=mock(PetRepo.class);
        idService=mock(IdService.class);
        petService=new PetService(petRepo,idService);
        pet1 =new Pet("1","Whiskers","albino","albino.png", new String[]{"Water Bottle", "Roomy Cage"});
    }

    @Test
    void addPet() {
        //GIVEN
        when(idService.generateId()).thenReturn("Whatever Id");
        Pet petWithId = new Pet("Whatever Id",pet1.name(),pet1.nameOfBreed(),pet1.photo(),pet1.Supplies());
        when(petRepo.save(petWithId)).thenReturn(petWithId);
        //WHEN
        Pet expected=petWithId;
        Pet actualPet=petService.addPet(pet1);
        //THEN
        verify(petRepo).save(petWithId);
        Assertions.assertEquals(expected,actualPet);
    }

    @Test
    void addPet_MissingName(){
        //GIVEN
        when(idService.generateId()).thenReturn("Whatever Id");
        Pet invalidPet =new Pet("Whatever Id",null, pet1.nameOfBreed(),pet1.photo(), pet1.Supplies());
        //WHEN & THEN
        assertThrows(IllegalArgumentException.class,()->petService.addPet(invalidPet));
    }

}