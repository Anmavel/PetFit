import React, {ChangeEvent, FormEvent, useState} from "react";
import {Pet} from "../model/Pet";
import {useNavigate} from "react-router-dom";
import Layout from "../component/Layout";
import "../page/AddPet.css"

type AddPetProps = {
    navigateTo: string | undefined
    onSubmit: (newPet: Pet) => Promise<void>

}

export default function AddPet(props: AddPetProps) {
    const [name, setName] = useState<string>("")
    const [nameOfBreed, setNameOfBreed] = useState<string>("")
    const [photo, setPhoto] = useState<string>("/petfit_logo_small_icon_only_inverted.png")
    const [supplies, setSupplies] = useState<Array<string>>([])
    const navigate = useNavigate()

    function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
        setName(event.target.value)
    }
    function handleBreedChange(event: ChangeEvent<HTMLInputElement>) {
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
        props.onSubmit(newPet)
            .then(() => {
                setName("")
                setNameOfBreed("")
                setPhoto("")
                setSupplies([])

            })
        if (props.navigateTo) {
            navigate(props.navigateTo)
        }
    }


    return (
        <Layout>
        <form onSubmit={formSubmitHandler} className={"add-pet"}>
            <label>
                <h2>Please register your new pet</h2>
            </label>
            <div className={"form-add"}>
                <input type={"text"} onChange={handleNameChange} value={name} placeholder={"write the name of your Pet"}
                       required={true}/>
                <input type={"text"} onChange={handleBreedChange} value={nameOfBreed} placeholder={"breed"} required={false}/>
                <input type={"text"} onChange={handlePhotoChange} value={photo} placeholder={"photo"} required={false}/>
                <input type={"text"} onChange={handleSuppliesChange} value={supplies} placeholder={"water bottle, food"} required={false}/>
                <button type={"submit"}> Add</button>
                <h6>Natasya Chen</h6>
            </div>

        </form>
        </Layout>
    )

}