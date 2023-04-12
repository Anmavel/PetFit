import {useEffect, useState} from "react";
import axios from "axios";
import {Breed} from "../model/Breed";

export default function usePetBreeds() {
    const [breeds, setBreeds] = useState<Breed[]>([]);
    //const url = "https://api.TheDogAPI.com/v1/images/search?breed_ids=" + 1

    function getBreeds() {
        axios.get("https://api.thedogapi.com/v1/breeds")
            .then(response => response.data
                .map((breeds: {}) => ({...breeds}))
            )
            .then(setBreeds)
            .catch(console.error)
    }
    useEffect(() => {
        getBreeds();
    }, []);


    return {breeds}
}