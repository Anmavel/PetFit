import {useEffect, useState} from "react";
import axios from "axios";
import {Breed} from "../model/Breed";
import {BreedPicture} from "../model/BreedPicture";

export default function usePetBreeds() {
    const [breeds, setBreeds] = useState<Breed[]>([]);
    const [breedPictures, setBreedPictures]= useState<BreedPicture[]>([]);

    function getBreeds() {
        axios.get("https://api.thedogapi.com/v1/breeds")
            .then(response => response.data
                .map((breeds: {}) => ({...breeds}))
            )
            .then(setBreeds)
            .catch(console.error)
    }


    function getBreedsPicture(id:number) {
        axios.get("https://api.TheDogAPI.com/v1/images/search?breed_ids="+ id)
            .then(response => {
                setBreedPictures(response.data);
            })
            .catch(console.error)
    }

    useEffect(() => {
        getBreeds();
    }, []);


    return {breeds, breedPictures, getBreedsPicture}
}