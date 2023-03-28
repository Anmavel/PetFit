import {Pet} from "../model/Pet";
import Layout from "../component/Layout";
import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import "../page/PetDetails.css"

type PetDetailsProps = {
    pets: Pet[]
    deletePet: (id: string) => Promise<void>
    updatePet: (updatedPet: Pet) => Promise<void>
}

export default function PetDetails(props: PetDetailsProps) {
    const [pet, setPet] = useState<Pet | undefined>()
    const params = useParams()
    const id = params.id
    const navigate = useNavigate()

    useEffect(() => {
            const filteredPet = props.pets.find(pet => pet.id === id);
            if (filteredPet) {
                setPet(filteredPet);
            }
        }
        , [id, props.pets]);

    if (!pet) {
        return (<h2>Sorry, Pet was deleted</h2>)
    }

    function handleDeleteButton() {
        props.deletePet(id || "undefined")
            .then(() => navigate("/pets/"))
            .catch(console.error)
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name=e.target.name
        const value=e.target.value
        setPet({...pet, [name]:value });

    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        props.updatePet(pet)
            .then(() => { setPet(pet)})
    };

    return (
        <Layout>
            <h2>Pet details</h2>
            <form onSubmit={handleSubmit} className={"add-pet"}>
                <label>
                    <h2>Please register your new pet</h2>
                </label>
                <div className={"form-add"}>
                    <input type={"text"} onChange={handleChange} name="name" value={pet.name} required={true}/>
                    <input type={"text"} onChange={handleChange} name="nameOfBreed" value={pet.nameOfBreed}
                           placeholder={"breed"} required={false}/>
                    <input type={"text"} onChange={handleChange} name="photo" value={pet.photo} placeholder={"photo"}
                           required={false}/>
                    <input type={"text"} onChange={handleChange} name="supplies" value={pet.supplies}
                           placeholder={"water bottle, food"} required={false}/>
                    <button onClick={handleDeleteButton}>Delete</button>
                    <br/>
                    <button type="submit">
                        Update
                    </button>

                </div>

            </form>
            <Link to={"/pets/"}>back to gallery</Link>
        </Layout>
    )


}