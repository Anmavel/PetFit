import {Pet} from "../model/Pet";
import Layout from "../component/Layout";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
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
            .then(() => {
                window.location.replace("/pets");
            })
            .catch(console.error)
    }


    function handleEdit() {
        navigate("/pets/" + id + "/update")
    }

    return (
        <Layout>
            <h2>{pet.name} details</h2>
            <div className={"pet-details"}>
                {pet.name}<br/>
                {pet.nameOfBreed[1]}<br/>
                <div>
                    <img
                        src={pet.photo}
                        alt="dog"
                    />
                </div>
                <div className={"container"}>
                    <button className="buttonDelete" onClick={handleDeleteButton}>Delete</button>
                    <button className="button buttonBack" onClick={() => navigate("/pets/")}>Back</button>
                    <button className="button buttonEdit" onClick={handleEdit}>Edit</button>
                </div>
            </div>
        </Layout>
    )

}