package com.example.backend.service;

import com.example.backend.exception.PetNotFoundException;
import com.example.backend.model.Pet;
import com.example.backend.model.PetDTO;
import com.example.backend.repository.PetRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static java.util.Collections.emptyList;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PetServiceTest {

    PetRepo petRepo;
    PetService petService;
    IdService idService;
    Pet pet1;
    PetDTO pet1DTO;

    @BeforeEach
    void setUp() {
        petRepo = mock(PetRepo.class);
        idService = mock(IdService.class);
        petService = new PetService(petRepo, idService);
        List<String> supplies = new ArrayList<>(List.of("Water Bottle", "Roomy Cage"));
        pet1DTO = new PetDTO("Whiskers", "albino", "albino.png", supplies);
        pet1 = new Pet("1", pet1DTO.name(), pet1DTO.nameOfBreed(), pet1DTO.photo(), pet1DTO.supplies());

    }

    @Test
    void when_getAllPets_then_OK() {
        //GIVEN
        when(petRepo.findAll()).thenReturn(new ArrayList<>());
        //WHEN
        List<Pet> actual = petService.getAllPets();
        List<Pet> expected = new ArrayList<>();
        //THEN
        verify(petRepo).findAll();
        Assertions.assertEquals(expected, actual);

    }

    @Test
    void when_addPet_then_OK() {
        //GIVEN
        when(idService.generateId()).thenReturn("Whatever Id");
        Pet petWithId = new Pet("Whatever Id", pet1.name(), pet1.nameOfBreed(), pet1.photo(), pet1.supplies());
        when(petRepo.save(petWithId)).thenReturn(petWithId);
        //WHEN
        Pet expected = petWithId;
        Pet actualPet = petService.addPet(pet1DTO);
        //THEN
        verify(idService).generateId();
        verify(petRepo).save(petWithId);
        Assertions.assertEquals(expected, actualPet);
    }

    @Test
    void when_addPet_with_MissingName_then_BadRequest() {
        //GIVEN
        when(idService.generateId()).thenReturn("Whatever Id");
        PetDTO invalidPet = new PetDTO(null, pet1.nameOfBreed(), pet1.photo(), pet1.supplies());
        //WHEN & THEN
        assertThrows(ResponseStatusException.class, () -> petService.addPet(invalidPet));
    }

    @Test
    void when_addPet_with_new_Supplies_then_OK() {
        // GIVEN
        when(idService.generateId()).thenReturn("Another Whatever Id");
        List<String> newSupplies = new ArrayList<>(List.of("food", "Water", "toys"));
        PetDTO pet2DTO = new PetDTO("Whiskers", "albino", "albino.png", newSupplies);
        Pet petWithId_and_newSupplies = new Pet("Another Whatever Id", pet1.name(), pet1.nameOfBreed(), pet1.photo(), newSupplies);
        when(petRepo.save(petWithId_and_newSupplies)).thenReturn(petWithId_and_newSupplies);

        //WHEN
        Pet expected = petWithId_and_newSupplies;
        Pet actualPet = petService.addPet(pet2DTO);

        //THEN
        verify(idService).generateId();
        verify(petRepo).save(petWithId_and_newSupplies);
        Assertions.assertEquals(expected, actualPet);

    }

    @Test
    void when_addPet_and_add_Empty_Supplies_then_OK() {
        // GIVEN
        when(idService.generateId()).thenReturn("Another Whatever Id");
        List<String> noSupplies = new ArrayList<>(emptyList());
        PetDTO pet2DTO = new PetDTO("Whiskers", "albino", "albino.png", noSupplies);
        Pet petWithId_and_noSupplies = new Pet("Another Whatever Id", pet1.name(), pet1.nameOfBreed(), pet1.photo(), noSupplies);
        when(petRepo.save(petWithId_and_noSupplies)).thenReturn(petWithId_and_noSupplies);

        //WHEN
        Pet expected = petWithId_and_noSupplies;
        Pet actualPet = petService.addPet(pet2DTO);

        //THEN
        verify(idService).generateId();
        verify(petRepo).save(petWithId_and_noSupplies);
        Assertions.assertEquals(expected, actualPet);

    }

    @Test
    void when_getPetById_then_OK(){
        // GIVEN
        String petId=pet1.id();
        when(petRepo.findById(petId)).thenReturn(Optional.of(pet1));
        //WHEN
        Pet actual=petService.getPetById(petId);
        Pet expected =pet1;
        //THEN
        verify(petRepo).findById(petId);
        Assertions.assertEquals(expected,actual);
    }

    @Test
    void when_getPetById_and_IdDoesntExist_then_ThrowException(){
        // GIVEN
        when(petRepo.findById("80")).thenReturn(Optional.empty());
        //WHEN & THEN
        assertThrows(PetNotFoundException.class, () -> petService.getPetById("80"));
        verify(petRepo).findById("80");
    }

    @Test
    void when_updatePet_then_OK() {
        //GIVEN
        when(petRepo.save(pet1)).thenReturn(pet1);
        when(petRepo.findById(pet1.id())).thenReturn(Optional.ofNullable(pet1));
        //WHEN
        Pet actual = petService.updatePet(pet1.id(), pet1DTO);
        Pet expected = pet1;
        //THEN
        verify(petRepo).save(pet1);
        verify(petRepo).findById(pet1.id());
        Assertions.assertEquals(expected, actual);
    }

    @Test
    void when_updatePet_and_IdDoesntExist_then_throwException() {
        //GIVEN
        when(petRepo.findById(pet1.id())).thenReturn(Optional.empty());
        //WHEN & THEN
        String petId=pet1.id();
        assertThrows(PetNotFoundException.class, () -> petService.updatePet(petId, pet1DTO));
        verify(petRepo).findById(pet1.id());
    }

    @Test
    void when_deletePet_and_PetDoesntExists_then_ThrowException() {
        //GIVEN
        when(petRepo.findById("80")).thenReturn(Optional.empty());
        //WHEN & THEN
        assertThrows(PetNotFoundException.class, () -> petService.deletePet("80"));
        verify(petRepo).findById("80");

    }

    @Test
    void when_deletePet_and_PetExists_then_ReturnPet() {
        //GIVEN
        when(petRepo.findById(pet1.id())).thenReturn(Optional.ofNullable(pet1));
        //WHEN
        Pet expected = pet1;
        Pet actual = petService.deletePet(pet1.id());
        //THEN
        assertEquals(expected, actual);
        verify(petRepo).findById(pet1.id());

    }

}

