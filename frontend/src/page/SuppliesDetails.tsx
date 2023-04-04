import {Pet} from "../model/Pet";
import Layout from "../component/Layout";
import React, {FormEvent, useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";


import "../page/PetDetails.css"
import {v4 as uuidv4} from "uuid";
import axios from "axios";
import {Supply} from "../model/Supply";

type SuppliesDetailsProps = {
    pets: Pet[]
    onUpdate: (updatedPet: Pet) => Promise<void>
}

export default function PetDetails(props: SuppliesDetailsProps) {
    const [pet, setPet] = useState<Pet | undefined>()
    const [supplies, setSupplies] = useState<Array<Supply>>([])
    const params = useParams()
    const id: string | undefined = params.id;
    const navigate = useNavigate()


    useEffect(() => {
            const filteredPet = props.pets.find(pet => pet.id === id);
            if (filteredPet) {
                setPet(filteredPet);
            } else {
                axios.get("/api/pets/" + id)
                    .then(response => response.data)
                    .then(setPet)
                    .catch(console.error);
            }
        }
        , [id, props.pets]);


    if (!setPet) {
        return (<h2>Sorry, Pet was deleted</h2>)
    }

    function formSubmitHandler(event: FormEvent<HTMLFormElement>) {
        if (!pet || !pet.id) {
            return;
        }
        const updatedPet: Pet = {
            ...pet,
            name: pet.name || '',
            supplies: supplies,
        };

        props.onUpdate(updatedPet).then(() => {
            setSupplies([]);
            navigate("/pets/" + id + "/update");
        });
    }

    return (
        <Layout>

            <h4>Supplies of your Pet</h4>
            <ul>
                {supplies.map((supply) => (
                    <li key={supply.id}>
                        {supply.nameItem} - {supply.bought ? "Bought" : "Not Bought"}
                    </li>
                ))}
            </ul>
            <form onSubmit={formSubmitHandler} className={"form-submit"}>
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
                        onClick={() => setSupplies([...supplies, {id: uuidv4(), nameItem: "", bought: false}])}>Add
                    supply
                </button>
                <button type={"submit"}>Save Changes</button>
                <Link to={"/pets/"}>back to gallery</Link>
                <h6>Natasya Chen</h6>
            </form>
        </Layout>
    )

}