package com.example.backend.model;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class PetTest {

    @Test
    void testEqualsAndHashCode() {
        Pet pet1 = new Pet("id1", "Pet1", "Breed1", "photo1", new String[]{"supply1", "supply2"});
        Pet pet2 = new Pet("id1", "Pet1", "Breed1", "photo1", new String[]{"supply1", "supply2"});
        Pet pet3 = new Pet("id2", "Pet2", "Breed2", "photo2", new String[]{"supply3", "supply4"});

        // Test equality of pet1 and pet2
        Assertions.assertEquals(pet1, pet2);

        // Test hash code equality of pet1 and pet2
        Assertions.assertEquals(pet1.hashCode(), pet2.hashCode());

        // Test inequality of pet1 and pet3
        Assertions.assertNotEquals(pet1, pet3);

        // Test hash code inequality of pet1 and pet3
        Assertions.assertNotEquals(pet1.hashCode(), pet3.hashCode());
    }
}

