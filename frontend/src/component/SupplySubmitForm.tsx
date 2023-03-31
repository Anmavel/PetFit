import React, {ChangeEvent, FormEvent, useState} from "react";
import {Supply} from "../model/Supply";
import {useNavigate} from "react-router-dom";
import "./SubmitForm.css"
import {Pet} from "../model/Pet";

type AddSupplyProps = {
    onSubmit: (supply: Supply) => Promise<void>
    supply:Supply
    pet:Pet
    navigateTo: string | undefined
    action: "add" | "update"

}

export default function AddPet(props: AddSupplyProps) {
    const [nameItem, setNameItem] = useState<string>(props.supply.nameItem)
    const [bought, setBought] = useState<boolean>(props.supply.bought)
    const [pet, setPet] = useState<>(props.pet)
    const navigate = useNavigate()

    function handleNameItemChange(event: ChangeEvent<HTMLInputElement>) {
        setNameItem(event.target.value)
    }
    const handleBoughtChange = () => {
        setBought(!bought);
    };


    function formSubmitHandler(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const suppliesId=props.pet.suppliesId
        const newPet: Pet = {name, nameOfBreed, photo, suppliesId}
        if(props.pet.id){
            newPet.id=props.pet.id
        }
        props.onSubmit(newPet)
            .then(() => {

                if (props.navigateTo) {
                    navigate(props.navigateTo)
                }
            })
    }


    return (

        <form onSubmit={formSubmitHandler} className={"form-submit"}>
            <input type={"text"} onChange={handleNameItemChange} value={nameItem} placeholder={"write the name of your Supply"} required={true}/>
            <input type={"checkbox"} onChange={handleBoughtChange} checked={bought} placeholder={"bought?"} required={false}/>
            <button type={"submit"}>
                {props.action === "add" && "Save"}
                {props.action === "update" && "Update"}
            </button>
            <h6>Natasya Chen</h6>
        </form>

    )

}