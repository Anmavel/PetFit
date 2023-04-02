import React, {ChangeEvent, FormEvent, useState} from "react";
import {Pet} from "../model/Pet";
import {Link, useNavigate} from "react-router-dom";
import "./SubmitForm.css"
import {Supply} from "../model/Supply";
import {v4 as uuidv4} from "uuid";


type AddPetProps = {
    onSubmit: (pet: Pet) => Promise<void>
    pet: Pet
    navigateTo: string | undefined
    action: "add" | "update"

}

export default function AddPet(props: AddPetProps) {
    const [name, setName] = useState<string>(props.pet.name)
    const [nameOfBreed, setNameOfBreed] = useState<string>(props.pet.nameOfBreed)
    const [photo, setPhoto] = useState<string>(props.pet.photo)
    const [supplies, setSupplies] = useState<Array<Supply>>(props.pet.supplies)
    const navigate = useNavigate()

    function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
        setName(event.target.value)
    }

    function handleBreedChange(event: ChangeEvent<HTMLInputElement>) {
        setNameOfBreed(event.target.value)
    }

    function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
        setPhoto(event.target.value)
    }

    function formSubmitHandler(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const newPet: Pet = {name, nameOfBreed, photo, supplies}
        if (props.pet.id) {
            newPet.id = props.pet.id
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
            <input type={"text"} onChange={handleNameChange} value={name} placeholder={"write the name of your Pet"}
                   required={true}/>
            <input type={"text"} onChange={handleBreedChange} value={nameOfBreed} placeholder={"breed"}
                   required={false}/>
            <input type={"text"} onChange={handlePhotoChange} value={photo} placeholder={"photo"} required={false}/>
            {supplies.map((supply, key) =>
                <div className={"submit-supply"} key={supply.id}>
                    <label>
                        <input
                            type={"text"}
                            onChange={event => setSupplies(supplies => supplies.map(
                                (supply, i) => i === key
                                    ? {...supply, nameItem: event.target.value}
                                    : supply
                            ))}
                            value={supply.nameItem}
                            placeholder={"water bottle, food"}
                            required={false}/></label>
                    <label>
                        <input
                            type={"checkbox"}
                            onChange={event => setSupplies(supplies => supplies.map(
                                (supply, i) => i === key
                                    ? {...supply, bought: !supply.bought}
                                    : supply
                            ))}
                            checked={supply.bought}/></label>

                    <button
                        type={"button"}
                        onClick={(event) =>
                            setSupplies((supplies) =>
                                supplies.filter((supply, i) => i !== key)
                            )
                        }
                    >Delete
                    </button>

                </div>)}

            <button type={"button"}
                    onClick={() => setSupplies([...supplies, {id: uuidv4(), nameItem: "", bought: false}])}>Add supply
            </button>


            <button type={"submit"}>
                {props.action === "add" && "Save"}
                {props.action === "update" && "Update"}
            </button>
            <Link to={"/pets/"}>back to gallery</Link>
            <h6>Natasya Chen</h6>
        </form>
    )

}