package com.example.backend.controller;

import com.example.backend.model.Pet;
import com.example.backend.repository.PetRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class PetControllerTest {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    PetRepo petRepo;
    Pet pet1;

    @BeforeEach
    void setUp() {

        pet1 = new Pet("1", "Whiskers", "albino", "albino.png", "supplies");
    }

    @Test
    @DirtiesContext
    void when_getAllPets_then_OK() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/pets/"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));

    }

    @Test
    @DirtiesContext
    void when_addPet_then_OK() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/pets/")
                        .contentType(MediaType.APPLICATION_JSON).content("""               
                                {"id": null,
                                "name": "Whiskers",
                                "nameOfBreed":"albino",
                                "photo":"albino.png",
                                "suppliesId": "supplies"}
                                    """)
                )
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """                        
                                {"name": "Whiskers",
                                "nameOfBreed":"albino",
                                "photo":"albino.png",
                                "suppliesId": "supplies"}
                                    """
                )).andExpect(jsonPath("$.id").isNotEmpty());
    }

    @Test
    @DirtiesContext
    void when_addPet_with_NotValidName_then_BadRequest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/pets/")
                        .contentType(MediaType.APPLICATION_JSON).content("""               
                                {"name":"",
                                "nameOfBreed":"albino",
                                "photo":"albino.png",
                                "suppliesId": "supplies"}
                                    """))
                .andExpect(status().isBadRequest());

    }

    @Test
    @DirtiesContext
    void when_getPetById_then_OK() throws Exception {
        petRepo.save(pet1);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/pets/1"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {"id":"1",
                        "name":"Whiskers",
                        "nameOfBreed":"albino",
                        "photo":"albino.png",
                        "suppliesId": "supplies"}
                        """));
    }

    @Test
    @DirtiesContext
    void when_getPetById_and_IdDoesntExist_then_Status404() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/pets/100"))
                .andExpect(status().isNotFound());
    }


    @Test
    @DirtiesContext
    void when_updatePet_then_OK() throws Exception {
        petRepo.save(pet1);
        mockMvc.perform(MockMvcRequestBuilders.put("/api/pets/1")
                        .contentType(MediaType.APPLICATION_JSON).
                        content(""" 
                                {"id": "1",
                                "name": "Whiskers",
                                "nameOfBreed":"albino",
                                "photo":"albino.png",
                                "suppliesId": "supplies"}
                                               
                                """))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                                  {"id": "1",
                                "name": "Whiskers",
                                "nameOfBreed":"albino",
                                "photo":"albino.png",
                                "suppliesId": "supplies"}
                                """));

    }

    @Test
    @DirtiesContext
    void when_deletePet_and_PetIdExists_then_Return_emptyList() throws Exception {
        petRepo.save(pet1);
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/pets/1"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {"id":"1",
                        "name": "Whiskers",
                        "nameOfBreed":"albino",
                        "photo":"albino.png",
                        "suppliesId": "supplies"}
                        """));

    }

}