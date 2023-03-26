import {Pet} from "../model/Pet";
import {useEffect, useState} from "react";
import axios from "axios";

export default function usePets(){
    const [pets,setPets]=useState<Pet[]>([]);
    function loadAllPets(){
        axios.get("/api/pets/")
            .then(response=>response.data
                .map((pet:{})=>({...pet}))
            )
            .then(setPets)
            .catch(console.error)
    }

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

    function deletePet(id:string){
        return axios.delete("/api/pets/"+id)
            .then(response=>response.data
                .map((pet:{})=>
                    ({
                        ...pet
                    })

            ))
            .then(setPets)
            .catch(console.error)
    }

    useEffect(()=>{loadAllPets()},[])

    return {pets,postNewPet,deletePet}
}