import React, {ChangeEvent, FormEvent, useState} from "react";
import {Pet} from "../model/Pet";

type AddPetProps = {
    navigateTo:string|undefined
    onSubmit:(newPet:Pet)=>Promise<void>

}


export default function AddPet(props: AddPetProps) {
    const[name,setName]=useState<string>("")
    const[nameOfBreed,setNameOfBreed]=useState<string>("")
    const[photo,setPhoto]=useState<string>()
    const[supplies,setSupplies]=useState<Array<string>>([])

    function handleNameChange(event:ChangeEvent<HTMLInputElement>){
        setName(event.target.value)
    }
    function formSubmitHandler(event:FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const newPet:Pet={name, nameOfBreed, photo:"", supplies}
        props.onSubmit(newPet)
            .then(() => {
                setName("")
                setNameOfBreed("")
                setPhoto("")
                setSupplies([])

            })
    }


    return (
        <form  onSubmit={formSubmitHandler} className={"add-pet"}>
            <label>
                <input type={"text"} onChange={handleNameChange} value={name} placeholder={"write the name of your Pet"} required={true}/>
                <input type={"text"} value={nameOfBreed} placeholder={"breed"} required={false}/>
                <input type={"text"} value={photo} placeholder={"photo"} required={false}/>
                <input type={"text"} value={supplies} placeholder={"water bottle"} required={false}/>
            </label>
            <button type={"submit"} > Add </button>
        </form>
    )

}