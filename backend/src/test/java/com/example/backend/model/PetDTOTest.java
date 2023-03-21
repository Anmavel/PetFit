package com.example.backend.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class PetDTOTest {

    @Test
    void constructor_InitializesFields() {
        // GIVEN
        String name = "Fido";
        String breed = "Golden Retriever";
        String photo = "https://example.com/fido.jpg";
        String[] supplies = {"Leash", "Food", "Water bowl"};

        // WHEN
        PetDTO pet = new PetDTO(name, breed, photo, supplies);

        // THEN
        assertEquals(name, pet.name());
        assertEquals(breed, pet.nameOfBreed());
        assertEquals(photo, pet.photo());
        assertArrayEquals(supplies, pet.supplies());
    }

    @Test
    void equals_ReturnsTrue_ForEqualObjects() {
        // GIVEN
        PetDTO pet1 = new PetDTO("Fido", "Golden Retriever", "https://example.com/fido.jpg", new String[]{"Leash", "Food", "Water bowl"});
        PetDTO pet2 = new PetDTO("Fido", "Golden Retriever", "https://example.com/fido.jpg", new String[]{"Leash", "Food", "Water bowl"});

        // THEN
        assertEquals(pet1, pet2);

    }

    @Test
    void equals_ReturnsTrue_ForDifferentObjects() {
        // GIVEN
        PetDTO pet1 = new PetDTO("Fido", "Golden Retriever", "https://example.com/fido.jpg", new String[]{"Leash", "Food", "Water bowl"});
        PetDTO pet2 = new PetDTO("Max", "Poodle", "https://example.com/max.jpg", new String[]{"Leash", "Food"});

        // THEN
        assertNotEquals(pet1, pet2);

    }

    @Test
    void hashCode_ReturnsSameValue_ForEqualObjects() {
        // GIVEN
        PetDTO pet1 = new PetDTO("Fido", "Golden Retriever", "https://example.com/fido.jpg", new String[]{"Leash", "Food", "Water bowl"});
        PetDTO pet2 = new PetDTO("Fido", "Golden Retriever", "https://example.com/fido.jpg", new String[]{"Leash", "Food", "Water bowl"});

        // THEN
        assertEquals(pet1.hashCode(), pet2.hashCode());
    }

    @Test
    void hashCode_ReturnsDifferentValue_ForDifferentObjects() {
        // GIVEN
        PetDTO pet1 = new PetDTO("Fido", "Golden Retriever", "https://example.com/fido.jpg", new String[]{"Leash", "Food", "Water bowl"});
        PetDTO pet2 = new PetDTO("Max", "Poodle", "https://example.com/max.jpg", new String[]{"Leash", "Food"});

        // THEN
        assertNotEquals(pet1.hashCode(), pet2.hashCode());
    }

}
