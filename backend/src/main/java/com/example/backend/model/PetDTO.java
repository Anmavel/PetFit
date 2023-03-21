package com.example.backend.model;

import java.util.Arrays;
import java.util.Objects;

public record PetDTO(String name,
                     String nameOfBreed,
                     String photo,
                     String[] supplies) {
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PetDTO pet = (PetDTO) o;
        return
                Objects.equals(name, pet.name) &&
                Objects.equals(nameOfBreed, pet.nameOfBreed) &&
                Objects.equals(photo, pet.photo) &&
                Arrays.equals(supplies, pet.supplies);
    }

    @Override
    public int hashCode() {
        int result = Objects.hash( name, nameOfBreed, photo);
        result = 31 * result + Arrays.hashCode(supplies);
        return result;
    }

    @Override
    public String toString() {
        return "Pet{" +
                ", name='" + name + '\'' +
                ", nameOfBreed='" + nameOfBreed + '\'' +
                ", photo='" + photo + '\'' +
                ", supplies=" + Arrays.toString(supplies) +
                '}';
    }
}
