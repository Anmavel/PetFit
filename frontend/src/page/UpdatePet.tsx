import {Pet} from "../model/Pet";
import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Layout from "../component/Layout";
import SubmitForm from "../component/SubmitForm";


type Props = {
    pets: Pet[],
    onUpdate: (updatedPet: Pet) => Promise<void>
}

export default function UpdateTask(props: Props) {
    const params = useParams();
    const petId: string | undefined = params.id;
    const [pet, setPet] = useState<Pet | undefined>();

    useEffect(() => {
        const filteredPet = props.pets.find(pet => pet.id === petId);
        if (filteredPet) {
            setPet(filteredPet);
        }
    }, [petId, props.pets]);

    if (!pet) {
        return (
            <h2>Sorry, no task with id {petId} found :(</h2>
        )
    }

    return (
        <Layout>
            <h2>Update your Pet</h2>
            <SubmitForm onSubmit={props.onUpdate}  navigateTo={"/pets/"} action={"update"} pet={pet}/>
            <Link to={"/pets/"}>back to gallery</Link>
        </Layout>
    )
}