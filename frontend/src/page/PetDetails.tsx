import {Pet} from "../model/Pet";
import Layout from "../component/Layout";
import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import "../page/PetDetails.css"

type PetDetailsProps = {
    pets: Pet[]
    deletePet: (id: string) => Promise<void>
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

    return (
        <Layout>
            <h2>Pet details</h2>
            <div className={"pet-details"}>
                <div>{pet.name}</div>
                <div>{pet.nameOfBreed}</div>
                <div>{pet.photo}<br/></div>
                <div>{pet.supplies}<br/></div>
                <button onClick={handleDeleteButton}>Delete</button>
            </div>
            <Link to={"/pets/"}>back to gallery</Link>
        </Layout>
    )


}