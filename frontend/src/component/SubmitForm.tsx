import {ChangeEvent, FormEvent, useState} from "react";
import {Pet} from "../model/Pet";
import {useNavigate} from "react-router-dom";
import "./SubmitForm.css"

type AddPetProps = {
    onSubmit: (pet: Pet) => Promise<void>
    pet:Pet
    navigateTo: string | undefined
    action: "add" | "update"

}

export default function AddPet(props: AddPetProps) {
    const [name, setName] = useState<string>(props.pet.name)
    const [nameOfBreed, setNameOfBreed] = useState<string>(props.pet.nameOfBreed)
    const [photo, setPhoto] = useState<string>(props.pet.photo)
    const [supplies, setSupplies] = useState<Array<string>>(props.pet.supplies)
    const navigate = useNavigate()

    function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
        setName(event.target.value)
    }  function handleBreedChange(event: ChangeEvent<HTMLInputElement>) {
        setNameOfBreed(event.target.value)
    }
    function handleSuppliesChange(event: ChangeEvent<HTMLInputElement>) {
        const suppliesArray=event.target.value.split(",")
        setSupplies(suppliesArray)
    }
    function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
        setPhoto(event.target.value)
    }


    function formSubmitHandler(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const newPet: Pet = {name, nameOfBreed, photo, supplies}
        if(props.pet.id){
            newPet.id=props.pet.id
        }
        props.onSubmit(newPet)
            .then(() => {
                setName("")
                setNameOfBreed("")
                setPhoto("")
                setSupplies([])
                if (props.navigateTo) {
                    navigate(props.navigateTo)
                }
            })
    }


    return (

            <form onSubmit={formSubmitHandler} className={"form-submit"}>
                    <input type={"text"} onChange={handleNameChange} value={name} placeholder={"write the name of your Pet"} required={true}/>
                    <input type={"text"} onChange={handleBreedChange} value={nameOfBreed} placeholder={"breed"} required={false}/>
                    <input type={"text"} onChange={handlePhotoChange} value={photo} placeholder={"photo"} required={false}/>
                    <input type={"text"} onChange={handleSuppliesChange} value={supplies} placeholder={"water bottle, food"} required={false}/>
                    <button type={"submit"}>
                        {props.action === "add" && "Save"}
                        {props.action === "update" && "Update"}
                    </button>
                    <h6>Natasya Chen</h6>
            </form>

    )

}