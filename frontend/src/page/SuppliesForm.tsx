import React, {FormEvent, useEffect, useState} from "react";
import {Supply} from "../model/Supply";
import {Pet} from "../model/Pet";
import {v4 as uuidv4} from "uuid";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";


type Props = {
    pets: Pet[]
    onUpdate: (updatedPet: Pet) => Promise<void>
}

export default function SuppliesForm(props: Props) {

    const params = useParams();
    const petId: string | undefined = params.id;
    const [pet, setPet] = useState<Pet | undefined>();
    const navigate = useNavigate()

    useEffect(() => {

        axios.get("/api/pets/" + petId)
            .then(response => {
                setPet(response.data)
                setSupplies(response.data.supplies)
            })
            .catch(console.error);

    }, [petId, props.pets]);

    const [supplies, setSupplies] = useState<Array<Supply>>(pet ? pet.supplies : [])

    if (!pet) {
        return (
            <h2>Sorry, no task with id {petId} found :(</h2>
        )
    }

    function formSubmitHandler(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (!pet) {
            return (
                <h2>Sorry, no task with id {petId} found :(</h2>
            )
        }
        const newPet: Pet = {...pet, supplies}
        if (pet.id) {
            newPet.id = pet.id
        }
        props.onUpdate(newPet)
            .then(() => navigate("/pets/" + pet.id + "/update"))
    }

    return (
        <>
            <h4>Supplies </h4>
            <form onSubmit={formSubmitHandler}>
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

                    </div>
                )}
                <button type={"button"}
                        onClick={() => setSupplies([...supplies, {id: uuidv4(), nameItem: "", bought: false}])}>Add
                    supply
                </button>
                <button>Save Changes</button>
            </form>
        </>
    )
}