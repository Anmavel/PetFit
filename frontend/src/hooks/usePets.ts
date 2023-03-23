import {Pet} from "../model/Pet";
import {useState} from "react";
import axios from "axios";

export default function usePets(){
    const [pets,setPets]=useState<Pet[]>([]);

    function postNewPet(newPet:Pet){
        return axios.post("/api/pets/", newPet)
            .then( response=>{
                const returnedPet={
                    ...response.data
                }
                setPets(prevState => [...prevState,returnedPet])
                })
            .catch(console.error)

    }

    return {pets,postNewPet}
}