import {useEffect, useState} from "react";
import axios from "axios";
import {Breed} from "../model/Breed";

export default function usePets() {
    const [breeds, setBreeds] = useState<Breed[]>([]);
    const [pictureBreed, setPictureBreed] = useState<String>("");
    const url = "https://api.TheDogAPI.com/v1/images/search?breed_ids=" + 1

    function getBreeds() {
        axios.get("https://api.thedogapi.com/v1/breeds")
            .then(response => response.data
                .map((breeds: {}) => ({...breeds}))
            )
            .then(setBreeds)
            .catch(console.error)
    }

    function getPetImage() {
        axios.get(url)
            .then(response => response.data
            )
            .then(setPictureBreed)
            .catch(console.error)
            .catch(console.error)
    }

    useEffect(() => {
        getBreeds()
        getPetImage()
    }, [])

    return {breeds, pictureBreed, getBreeds, getPetImage}
}