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
    void setUp(){
        List<String> supplies = new ArrayList<>(List.of("Water Bottle","Roomy Cage"));
        pet1 =new Pet("1","Whiskers","albino","albino.png",supplies);
    }

    @Test
    @DirtiesContext
    void when_addPet_then_OK() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/pets/")
                        .contentType(MediaType.APPLICATION_JSON).content("""               
                                {"id": null, "name": "Whiskers","nameOfBreed":"albino", "photo":"albino.png","supplies": ["Water Bottle","Roomy Cage"] }
                                    """)
                        )
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """                        
                                {"name": "Whiskers","nameOfBreed":"albino", "photo":"albino.png","supplies": ["Water Bottle","Roomy Cage"]}
                                    """
                )).andExpect(jsonPath("$.id").isNotEmpty());
    }
    @Test
    @DirtiesContext
    void when_addPet_with_NotValidName_then_BadRequest() throws Exception {
            mockMvc.perform(MockMvcRequestBuilders.post("/api/pets/")
                    .contentType(MediaType.APPLICATION_JSON).content("""               
                                {"name":"","nameOfBreed":"albino", "photo":"albino.png","supplies": ["Water Bottle","Roomy Cage"] }
                                    """))
                    .andExpect(status().isBadRequest());

    }

}