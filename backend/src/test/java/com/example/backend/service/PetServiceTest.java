package com.example.backend.service;

import com.example.backend.model.Pet;
import com.example.backend.model.PetDTO;
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
    PetDTO pet1DTO;

    @BeforeEach
    void setUp(){
        petRepo=mock(PetRepo.class);
        idService=mock(IdService.class);
        petService=new PetService(petRepo,idService);
        String[] supplies = new String[]{"Water Bottle", "Roomy Cage"};
        pet1DTO =new PetDTO("Whiskers","albino","albino.png",supplies);
        pet1 =new Pet("1",pet1DTO.name(),pet1DTO.nameOfBreed(), pet1DTO.photo(), pet1DTO.supplies());

    }

    @Test
    void addPet() {
        //GIVEN
        when(idService.generateId()).thenReturn("Whatever Id");
        Pet petWithId = new Pet("Whatever Id",pet1.name(),pet1.nameOfBreed(),pet1.photo(),pet1.supplies());
        when(petRepo.save(petWithId)).thenReturn(petWithId);
        //WHEN
        Pet expected=petWithId;
        Pet actualPet=petService.addPet(pet1DTO);
        //THEN
        verify(idService).generateId();
        verify(petRepo).save(petWithId);
        Assertions.assertEquals(expected,actualPet);
    }

    @Test
    void addPet_MissingName(){
        //GIVEN
        when(idService.generateId()).thenReturn("Whatever Id");
        PetDTO invalidPet =new PetDTO(null, pet1.nameOfBreed(), pet1.photo(), pet1.supplies());
        //WHEN & THEN
        assertThrows(IllegalArgumentException.class,()->petService.addPet(invalidPet));
    }
    @Test
    void addPet_add_New_Supplies() {
        // GIVEN
        when(idService.generateId()).thenReturn("Another Whatever Id");
        String[] newSupplies =  new String[]{"food", "water", "toys"};
        PetDTO pet2DTO =new PetDTO("Whiskers","albino","albino.png",newSupplies);
        Pet petWithId_and_newSupplies = new Pet ("Another Whatever Id", pet1.name(),pet1.nameOfBreed(),pet1.photo(),newSupplies);
        when(petRepo.save(petWithId_and_newSupplies)).thenReturn(petWithId_and_newSupplies);


        //WHEN
        Pet expected=petWithId_and_newSupplies;
        Pet actualPet=petService.addPet(pet2DTO);

        //THEN
        verify(idService).generateId();
        verify(petRepo).save(petWithId_and_newSupplies);
        Assertions.assertEquals(expected,actualPet);

    }

}

