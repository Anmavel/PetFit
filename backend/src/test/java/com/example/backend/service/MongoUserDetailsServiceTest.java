package com.example.backend.service;

import com.example.backend.model.MongoUser;
import com.example.backend.model.MongoUserRequest;
import com.example.backend.model.MongoUserResponse;
import com.example.backend.repository.MongoUserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class MongoUserDetailsServiceTest {
    MongoUserRepository mongoUserRepository;
    PasswordEncoder passwordEncoder;
    IdService idService;
    MongoUser mongoUser;
    MongoUserDetailsService mongoUserDetailsService;
    @BeforeEach
    void setUp() {
        mongoUserRepository = mock(MongoUserRepository.class);
        passwordEncoder = mock(PasswordEncoder.class);
        idService = mock(IdService.class);
        mongoUserDetailsService = new MongoUserDetailsService(mongoUserRepository, passwordEncoder, idService);
        mongoUser = new MongoUser("1", "username", "123", "BASIC");
    }
    @Test
    void loadUserByUsername() {
        //GIVEN
        when(mongoUserRepository.findByUsername("username")).thenReturn(Optional.of(mongoUser));
        //WHEN
        UserDetails actual = mongoUserDetailsService.loadUserByUsername("username");
        UserDetails expected = new User(mongoUser.username(), mongoUser.password(),
                List.of(new SimpleGrantedAuthority(("ROLE_" + mongoUser.role()))));
        //THEN
        verify(mongoUserRepository).findByUsername("username");
        Assertions.assertEquals(expected, actual);
    }

    @Test
    void when_signup_then_OK() {
        //GIVEN
        when(passwordEncoder.encode(mongoUser.password())).thenReturn(mongoUser.password());
        when(idService.generateId()).thenReturn(mongoUser.id());
        MongoUserRequest mongoUserRequest = new MongoUserRequest(mongoUser.username(), mongoUser.password());
        when(mongoUserRepository.save(mongoUser)).thenReturn(mongoUser);
        //WHEN
        MongoUserResponse actual = mongoUserDetailsService.signup(mongoUserRequest);
        MongoUserResponse expected = new MongoUserResponse(mongoUser.id(), mongoUser.username(), mongoUser.role());
        //THEN
        verify(passwordEncoder).encode(mongoUser.password());
        verify(idService).generateId();
        verify(mongoUserRepository).save(mongoUser);
        Assertions.assertEquals(expected, actual);
    }
    @Test
    void when_signup_and_missingName_then_BadRequest() {
        // GIVEN
        when(passwordEncoder.encode(mongoUser.password())).thenReturn(mongoUser.password());
        when(idService.generateId()).thenReturn(mongoUser.id());
        MongoUserRequest mongoUserRequest = new MongoUserRequest(null, mongoUser.password());
        ResponseStatusException exception= assertThrows(ResponseStatusException.class, () -> mongoUserDetailsService.signup(mongoUserRequest));
        Assertions.assertEquals(HttpStatus.BAD_REQUEST, exception.getStatusCode());
        Assertions.assertEquals("Username is required", exception.getReason());
    }
    @Test
    void when_signup_and_EmptyName_then_BadRequest() {
        // GIVEN
        when(passwordEncoder.encode(mongoUser.password())).thenReturn(mongoUser.password());
        when(idService.generateId()).thenReturn(mongoUser.id());
        MongoUserRequest mongoUserRequest = new MongoUserRequest("", mongoUser.password());
        ResponseStatusException exception= assertThrows(ResponseStatusException.class, () -> mongoUserDetailsService.signup(mongoUserRequest));
        Assertions.assertEquals(HttpStatus.BAD_REQUEST, exception.getStatusCode());
        Assertions.assertEquals("Username is required", exception.getReason());
    }

    @Test
    void when_signup_and_missingPassword_then_BadRequest() {
        // GIVEN
        when(passwordEncoder.encode(mongoUser.password())).thenReturn(mongoUser.password());
        when(idService.generateId()).thenReturn(mongoUser.id());
        MongoUserRequest mongoUserRequest = new MongoUserRequest(mongoUser.username(), null);
        ResponseStatusException exception= assertThrows(ResponseStatusException.class, () -> mongoUserDetailsService.signup(mongoUserRequest));
        Assertions.assertEquals(HttpStatus.BAD_REQUEST, exception.getStatusCode());
        Assertions.assertEquals("Password is required", exception.getReason());
    }
    @Test
    void when_signup_and_EmptyPassword_then_BadRequest() {
        // GIVEN
        when(passwordEncoder.encode(mongoUser.password())).thenReturn(mongoUser.password());
        when(idService.generateId()).thenReturn(mongoUser.id());
        MongoUserRequest mongoUserRequest = new MongoUserRequest(mongoUser.username(), "");
        ResponseStatusException exception= assertThrows(ResponseStatusException.class, () -> mongoUserDetailsService.signup(mongoUserRequest));
        Assertions.assertEquals(HttpStatus.BAD_REQUEST, exception.getStatusCode());
        Assertions.assertEquals("Password is required", exception.getReason());
    }



}