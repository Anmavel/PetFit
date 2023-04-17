import {Pet} from "../model/Pet";
import Layout from "../component/Layout";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import "../page/PetDetails.css"
import SuppliesDetails from "../component/SuppliesDetails";

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
        return (<h2>Sorry, Pet not found</h2>)
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
                <h4>{pet.nameOfBreed[1]}</h4><br/>
                <img src={pet.photo} alt="dog"/>
                <SuppliesDetails pet={pet}/>
                <button className={"buttonToSupplies"} onClick={() => navigate("/pets/" + pet.id + "/supplies")}>To supplies</button>
                <div className={"container"}>
                    <button className="button buttonDelete" onClick={handleDeleteButton}>Delete</button>
                    <button className="button buttonBack" onClick={() => navigate("/pets/")}>Back to gallery</button>
                    <button className="button buttonEdit" onClick={handleEdit}>Edit</button>
                </div>
            </div>
        </Layout>
    )

}