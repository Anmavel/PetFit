package com.example.backend.controller;

import com.example.backend.model.MongoUser;
import com.example.backend.model.Pet;
import com.example.backend.model.Supply;
import com.example.backend.repository.MongoUserRepository;
import com.example.backend.repository.PetRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
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
    @Autowired
    MongoUserRepository mongoUserRepository;
    MongoUser mongoUser;

    @BeforeEach
    void setUp() {
        List<Supply> supplies = new ArrayList<>();
        supplies.add(new Supply("Item1", false));
        supplies.add(new Supply("Item2", true));
        supplies.add(new Supply("Item3", false));
        List<String> nameOfBreed = new ArrayList<>();
        nameOfBreed.add("1" );
        nameOfBreed.add("albino" );


        pet1 = new Pet("1", "Whiskers", nameOfBreed, "albino.png", supplies, "a");
        mongoUser = new MongoUser("a","user","password","BASIC");
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "user")
    void when_getAllPets_then_OK() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/users")
                .contentType(MediaType.APPLICATION_JSON).content("""
                        {
                        "username": "user",
                        "password" : "password"
                        }
                        """).with(csrf())
        ).andExpect(status().isOk());
        mockMvc.perform(MockMvcRequestBuilders.get("/api/pets/"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));

    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "user")
    void when_addPet_then_OK() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/users")
                .contentType(MediaType.APPLICATION_JSON).content("""
                        {
                        "username": "user",
                        "password" : "password"
                        }
                        """).with(csrf())
        ).andExpect(status().isOk());

        mockMvc.perform(MockMvcRequestBuilders.post("/api/pets/")
                        .contentType(MediaType.APPLICATION_JSON).content("""               
                                {"id": null,
                                "name": "Whiskers",
                                "nameOfBreed":["1","albino"],
                                "photo":"albino.png",
                                "supplies":[
                                {"nameItem":"Item1","bought":false},
                                {"nameItem":"Item2","bought":true},
                                {"nameItem":"Item3","bought":false}
                                    ]}
                                    """).with(csrf())
                )
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """                        
                                {"name": "Whiskers",
                                "nameOfBreed":["1","albino"],
                                "photo":"albino.png",
                                "supplies":[
                                {"nameItem":"Item1","bought":false},
                                {"nameItem":"Item2","bought":true},
                                {"nameItem":"Item3","bought":false}
                                    ]}
                                    """
                )).andExpect(jsonPath("$.id").isNotEmpty());
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "user")
    void when_addPet_with_NotValidName_then_BadRequest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/pets/")
                        .contentType(MediaType.APPLICATION_JSON).content("""               
                                {"name":"",
                                "nameOfBreed":["1","albino"],
                                "photo":"albino.png",
                                "supplies":[
                                {"nameItem":"Item1","bought":false},
                                {"nameItem":"Item2","bought":true},
                                {"nameItem":"Item3","bought":false}
                                    ]}
                                    """).with(csrf())
                )
                .andExpect(status().isBadRequest());

    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "user")
    void when_getPetById_then_OK() throws Exception {
        petRepo.save(pet1);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/pets/1"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {"id":"1",
                        "name":"Whiskers",
                        "nameOfBreed":["1","albino"],
                        "photo":"albino.png",
                        "supplies":[
                        {"nameItem":"Item1","bought":false},
                        {"nameItem":"Item2","bought":true},
                        {"nameItem":"Item3","bought":false}
                            ]}
                        """));
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "user")
    void when_getPetById_and_IdDoesntExist_then_Status404() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/pets/100"))
                .andExpect(status().isNotFound());
    }


    @Test
    @DirtiesContext
    @WithMockUser(username = "user")
    void when_updatePet_then_OK() throws Exception {
        petRepo.save(pet1);
        mongoUserRepository.save(mongoUser);
        mockMvc.perform(MockMvcRequestBuilders.put("/api/pets/1")
                        .contentType(MediaType.APPLICATION_JSON).
                        content(""" 
                                {"id": "1",
                                "name": "Whiskers",
                                "nameOfBreed":["1","albino"],
                                "photo":"albino.png",
                                "supplies":[
                                {"nameItem":"Item1","bought":false},
                                {"nameItem":"Item2","bought":true},
                                {"nameItem":"Item3","bought":false}
                                    ]}  
                                """).with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                                  {"id": "1",
                                   "name": "Whiskers",
                                   "nameOfBreed":["1","albino"],
                                   "photo":"albino.png",
                                   "supplies":[
                                   {"nameItem":"Item1","bought":false},
                                   {"nameItem":"Item2","bought":true},
                                   {"nameItem":"Item3","bought":false}
                                   ]}
                                """));

    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "user")
    void when_deletePet_and_PetIdExists_then_Return_emptyList() throws Exception {
        petRepo.save(pet1);
        mongoUserRepository.save(mongoUser);
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/pets/1")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {"id":"1",
                        "name": "Whiskers",
                        "nameOfBreed":["1","albino"],
                        "photo":"albino.png",
                        "supplies":[
                        {"nameItem":"Item1","bought":false},
                        {"nameItem":"Item2","bought":true},
                        {"nameItem":"Item3","bought":false}
                            ]}
                        """));

    }

}