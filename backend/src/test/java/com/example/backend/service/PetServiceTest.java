package com.example.backend.service;

import com.example.backend.exception.PetNotFoundException;
import com.example.backend.model.MongoUserResponse;
import com.example.backend.model.Pet;
import com.example.backend.model.PetDTO;
import com.example.backend.model.Supply;
import com.example.backend.repository.PetRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PetServiceTest {

    PetRepo petRepo;
    PetService petService;
    IdService idService;
    MongoUserDetailsService mongoUserDetailsService;
    Principal principal;
    Pet pet1;
    PetDTO pet1DTO;
    Pet petNoSupplies;
    PetDTO petNoSuppliesDTO;

    @BeforeEach
    void setUp() {
        petRepo = mock(PetRepo.class);
        idService = mock(IdService.class);
        mongoUserDetailsService =mock(MongoUserDetailsService.class);
        principal =mock(Principal.class);
        petService = new PetService(petRepo, idService, mongoUserDetailsService);
        List<Supply> supplies = new ArrayList<>();
        supplies.add(new Supply("Item1", false));
        supplies.add(new Supply("Item2", true));
        supplies.add(new Supply("Item3", false));
        List<Supply> noSupplies =new ArrayList<>();
        List<String> nameOfBreed = new ArrayList<>();
        nameOfBreed.add("1" );
        nameOfBreed.add("albino" );
        pet1DTO = new PetDTO("Whiskers", nameOfBreed, "albino.png", supplies);
        pet1 = new Pet("1", pet1DTO.name(), pet1DTO.nameOfBreed(), pet1DTO.photo(), pet1DTO.supplies(),"a");
        petNoSuppliesDTO = new PetDTO("Whiskers", nameOfBreed, "albino.png", noSupplies);
        petNoSupplies = new Pet("1", petNoSuppliesDTO.name(), petNoSuppliesDTO.nameOfBreed(), petNoSuppliesDTO.photo(), petNoSuppliesDTO.supplies(),"a");

    }

    @Test
    void when_getAllPets_then_OK() {
        //GIVEN
        when(mongoUserDetailsService.getMe(principal)).thenReturn(new MongoUserResponse("123", "user","BASIC"));
        when(petRepo.findPetByUserId("123")).thenReturn(new ArrayList<>());
        //WHEN
        List<Pet> actual = petService.getAllPets(principal);
        List<Pet> expected = new ArrayList<>();
        //THEN
        verify(petRepo).findPetByUserId("123");
        Assertions.assertEquals(expected, actual);

    }

    @Test
    void when_addPet_then_OK() {
        //GIVEN
        when(idService.generateId()).thenReturn("Whatever Id");
        Pet petWithId = new Pet("Whatever Id", pet1.name(), pet1.nameOfBreed(), pet1.photo(), pet1.supplies(),"a");
        when(petRepo.save(petWithId)).thenReturn(petWithId);
        when(mongoUserDetailsService.getMe(principal)).thenReturn(new MongoUserResponse("a","",""));
        //WHEN
        Pet expected = petWithId;
        Pet actualPet = petService.addPet(pet1DTO,principal);
        //THEN
        verify(petRepo).save(petWithId);
        verify(idService).generateId();
        verify(mongoUserDetailsService).getMe(principal);
        Assertions.assertEquals(expected, actualPet);
    }

    @Test
    void when_addPet_with_MissingName_then_BadRequest() {
        //GIVEN
        when(idService.generateId()).thenReturn("Whatever Id");
        PetDTO invalidPet = new PetDTO(null, pet1.nameOfBreed(), pet1.photo(), pet1.supplies());
        //WHEN & THEN
        assertThrows(IllegalArgumentException.class, () -> petService.addPet(invalidPet,principal));
    }

    @Test
    void when_addPet_and_add_Empty_Supplies_then_OK() {
        // GIVEN
        when(idService.generateId()).thenReturn("1");
        List<Supply> noSupplies2 =new ArrayList<>();
        List<String> nameOfBreed = new ArrayList<>();
        nameOfBreed.add("1" );
        nameOfBreed.add("albino" );
        PetDTO petNoSuppliesDTO_pet2 = new PetDTO("Whiskers",nameOfBreed, "albino.png", noSupplies2);
        Pet petWithId_and_noSupplies = new Pet("1", "Whiskers", nameOfBreed, "albino.png", petNoSuppliesDTO_pet2.supplies(), "a");
        when(petRepo.save(petWithId_and_noSupplies)).thenReturn(petWithId_and_noSupplies);
        when(mongoUserDetailsService.getMe(principal)).thenReturn(new MongoUserResponse("a", "", ""));

        // WHEN
        Pet expected = petNoSupplies;
        Pet actual = petService.addPet(petNoSuppliesDTO_pet2, principal);

        // THEN
        verify(idService).generateId();
        verify(petRepo).save(petWithId_and_noSupplies);
        verify(mongoUserDetailsService).getMe(principal);
        Assertions.assertEquals(expected, actual);
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
        when(mongoUserDetailsService.getMe(principal)).thenReturn(new MongoUserResponse("a","",""));
        when(petRepo.findById(pet1.id())).thenReturn(Optional.ofNullable(pet1));
        //WHEN
        Pet actual = petService.updatePet(pet1.id(), pet1DTO,principal);
        Pet expected = pet1;
        //THEN
        verify(petRepo).save(pet1);
        verify(mongoUserDetailsService).getMe(principal);
        verify(petRepo).findById(pet1.id());
        Assertions.assertEquals(expected, actual);
    }

    @Test
    void when_updatePet_and_IdDoesntExist_then_throwException() {
        //GIVEN
        when(petRepo.findById(pet1.id())).thenReturn(Optional.empty());
        when(mongoUserDetailsService.getMe(principal)).thenReturn(new MongoUserResponse("a","",""));
        //WHEN & THEN
        String petId=pet1.id();
        assertThrows(PetNotFoundException.class, () -> petService.updatePet(petId, pet1DTO,principal));
        verify(mongoUserDetailsService).getMe(principal);
        verify(petRepo).findById(pet1.id());
    }

    @Test
    void when_deletePet_and_PetDoesntExists_then_ThrowException() {
        //GIVEN
        when(petRepo.findById("80")).thenReturn(Optional.empty());
        when(mongoUserDetailsService.getMe(principal)).thenReturn(new MongoUserResponse("a","",""));
        //WHEN & THEN
        assertThrows(PetNotFoundException.class, () -> petService.deletePet("80",principal));
        verify(mongoUserDetailsService).getMe(principal);
        verify(petRepo).findById("80");

    }

    @Test
    void when_deletePet_and_PetExists_then_ReturnPet() {
        //GIVEN
        when(petRepo.findById(pet1.id())).thenReturn(Optional.ofNullable(pet1));
        when(mongoUserDetailsService.getMe(principal)).thenReturn(new MongoUserResponse("a","",""));
        //WHEN
        Pet expected = pet1;
        Pet actual = petService.deletePet(pet1.id(),principal);
        //THEN
        assertEquals(expected, actual);
        verify(mongoUserDetailsService).getMe(principal);
        verify(petRepo).findById(pet1.id());

    }

}

