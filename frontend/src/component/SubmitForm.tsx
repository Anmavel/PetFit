import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Pet} from "../model/Pet";
import {useNavigate} from "react-router-dom";
import "./SubmitForm.css"
import {Supply} from "../model/Supply";
import {Breed} from "../model/Breed";
import getBreeds from '../hooks/usePetBreeds';
import usePets from "../hooks/usePetBreeds";
import usePetBreeds from "../hooks/usePetBreeds";

type AddPetProps = {
    onSubmit: (pet: Pet) => Promise<void>
    pet: Pet
    navigateTo: string | undefined
    action: "add" | "update"

}

export default function AddPet(props: AddPetProps) {

    const [name, setName] = useState<string>(props.pet.name)
    const [photo, setPhoto] = useState<string>(props.pet.photo||"https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80")
    const [supplies] = useState<Array<Supply>>(props.pet.supplies)
    const navigate = useNavigate()
    const {breeds}=usePetBreeds()
    function handleChangeName(event:ChangeEvent<HTMLInputElement>){
        setName(event.target.value)
    }


    function formSubmitHandler(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const breed_newPet=[","]
        const newPet: Pet = {name,breed_newPet, photo, supplies}
        if (props.pet.id) {
            newPet.id = props.pet.id
        }
        props.onSubmit(newPet)
            .then(() => {
                setName("")
                setPhoto("")

                if (props.navigateTo) {
                    navigate(props.navigateTo)
                }
            })
    }


    return (

        <form onSubmit={formSubmitHandler} className={"form-submit"}>
            <input type={"text"} onChange={handleChangeName} value={name} placeholder={"write the name of your Pet"}
                   required={true}/>
            <select value={onlyNameOfBreed} onChange={}>
                {breeds.map((breed) => (
                    <option value={breed.name} key={breed.id}>
                        {breed.name}
                    </option>
                ))}
            </select>
            <div >
                <img
                    src={props.pet.photo}
                    alt="dog"
                />
            </div>

            <button onClick={() => navigate("/pets/" + props.pet.id + "/supplies")}>To supplies</button>

            <button type={"submit"}>
                {props.action === "add" && "Save"}
                {props.action === "update" && "Update"}
            </button>
            <h6>Natasya Chen</h6>
        </form>
    )
}