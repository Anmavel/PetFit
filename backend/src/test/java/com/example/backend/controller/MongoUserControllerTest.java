package com.example.backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class MongoUserControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    @DirtiesContext
    @WithMockUser(username = "user", password = "123")
    void getMe_whenRegistered_thenReturnDTO() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                "username": "user",
                                "password": "123"
                                }
                                """)
                        .with(csrf()))
                .andExpect(status().isOk());
        mockMvc.perform(MockMvcRequestBuilders.get("/api/users/me"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                        "username": "user",
                        "role": "BASIC"
                        }
                                                """));
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "user", password = "123")
    void postUser_whenNoCSRFToken_then403() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                "username": "user",
                                "password": "123"
                                }
                                """))
                .andExpect(status().isForbidden());
    }

    @Test
    @DirtiesContext
    void log_in() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                "username": "user",
                                "password": "123"
                                }
                                """)
                        .with(csrf()))
                .andExpect(status().isOk());
        mockMvc.perform(MockMvcRequestBuilders.post("/api/users/login")
                        .with(httpBasic("user", "123"))
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                        "username": "user",
                        "role": "BASIC"
                        }
                                                """));
    }

    @Test
    @DirtiesContext
    void log_out() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                "username": "user",
                                "password": "123"
                                }
                                """)
                        .with(csrf()))
                .andExpect(status().isOk());
        mockMvc.perform(MockMvcRequestBuilders.post("/api/users/login")
                        .with(httpBasic("user", "123"))
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                        "username": "user",
                        "role": "BASIC"
                        }
                                                """));
        mockMvc.perform(MockMvcRequestBuilders.post("/api/users/logout").with(csrf()))
                .andExpect(status().isOk());
        mockMvc.perform(MockMvcRequestBuilders.get("/api/users/me"))
                .andExpect(status().isUnauthorized());
    }


}