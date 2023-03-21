package com.example.backend.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Arrays;
import java.util.Objects;

@Document("pets")
public record Pet(
        @Id
        String id,
        String name,
        String nameOfBreed,
        String photo,
        String[] supplies) {

        @Override
        public boolean equals(Object o) {
                if (this == o) return true;
                if (o == null || getClass() != o.getClass()) return false;
                Pet pet = (Pet) o;
                return Objects.equals(id, pet.id) &&
                        Objects.equals(name, pet.name) &&
                        Objects.equals(nameOfBreed, pet.nameOfBreed) &&
                        Objects.equals(photo, pet.photo) &&
                        Arrays.equals(supplies, pet.supplies);
        }

        @Override
        public int hashCode() {
                int result = Objects.hash(id, name, nameOfBreed, photo);
                result = 31 * result + Arrays.hashCode(supplies);
                return result;
        }

        @Override
        public String toString() {
                return "Pet{" +
                        "id='" + id + '\'' +
                        ", name='" + name + '\'' +
                        ", nameOfBreed='" + nameOfBreed + '\'' +
                        ", photo='" + photo + '\'' +
                        ", supplies=" + Arrays.toString(supplies) +
                        '}';
        }
}