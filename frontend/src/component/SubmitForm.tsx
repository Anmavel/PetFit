import React, {ChangeEvent, FormEvent, useState} from "react";
import {Pet} from "../model/Pet";
import {useNavigate} from "react-router-dom";
import "./SubmitForm.css"
import {Supply} from "../model/Supply";
import usePetBreeds from "../hooks/usePetBreeds";

type AddPetProps = {
    onSubmit: (pet: Pet) => Promise<void>
    pet: Pet
    navigateTo: string | undefined
    action: "add" | "update"

}

export default function AddPet(props: AddPetProps) {

    const [name, setName] = useState<string>(props.pet.name)
    const [supplies] = useState<Array<Supply>>(props.pet.supplies)
    const {breeds, breedPictures,getBreedsPicture} = usePetBreeds()
    const [photo, setPhoto] = useState<string>(props.pet.photo)
    const [breedIndex, setBreedIndex] = useState<number>(Number(props.pet.nameOfBreed[0]))
    const navigate = useNavigate()

    function handleChangeName(event: ChangeEvent<HTMLInputElement>) {
        setName(event.target.value)
    }

    function handleBreedChange(event: ChangeEvent<HTMLSelectElement>) {
        setBreedIndex(Number(event.target.value))
        getBreedsPicture(breeds[Number(event.target.value)].id)
        setPhoto(breedPictures[0].url)
    }
    function getPicture(){
        return breedPictures[0]?.url||props.pet.photo
    }


    function formSubmitHandler(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        let nameOfBreed = [breedIndex.toString(),breeds[breedIndex].name]
        let photo=breedPictures[0]?.url
        const newPet: Pet = {name, nameOfBreed, photo, supplies}
        if (props.pet.id) {
            newPet.id = props.pet.id
        }
        if (props.pet.nameOfBreed[0] === nameOfBreed[0]) {
            newPet.photo = props.pet.photo;
        }

        props.onSubmit(newPet)
            .then(() => {
                setName("")
                setBreedIndex(0)
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
            <select value={breedIndex} onChange={handleBreedChange} required={true}>
                {breeds.map((breed,index) => (
                    <option value={index} key={breed.id}>
                        {breed.name}
                    </option>
                ))}
            </select>

            <div>
                <img defaultValue={photo} src={getPicture()} alt="dog"/>
            </div>

            <button onClick={() => navigate("/pets/" + props.pet.id + "/supplies")}>To supplies</button>

            <button type={"submit"}>
                {props.action === "add" && "Save"}
                {props.action === "update" && "Update"}
            </button>
        </form>
    )
}