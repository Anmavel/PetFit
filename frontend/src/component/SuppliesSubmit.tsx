import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Pet} from "../model/Pet";
import {Link, useNavigate, useParams} from "react-router-dom";
import "./SubmitForm.css"
import {Supply} from "../model/Supply";
import {v4 as uuidv4} from "uuid";

type SuppliesPetProps = {
    onSubmit: (pet: Pet) => Promise<void>
    pet: Pet
    navigateTo: string | undefined
    action: "add" | "update"

}

export default function AddPet(props: SuppliesPetProps) {
    const params = useParams();
    const [pet, setPet] = useState<Pet>(props.pet);
    const navigate = useNavigate()
    const [supplies, setSupplies] = useState<Array<Supply>>(props.pet.supplies)

    function formSubmitHandler(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        props.onSubmit(pet)
            .then(() => {
                setSupplies([])

                if (props.navigateTo) {
                    navigate(props.navigateTo)
                }
            })
    }


    return (

        <form onSubmit={formSubmitHandler} className={"form-submit"}>
            {props.pet.supplies.map((supply, key) =>
                <div className={"submit-supply"} key={supply.id}>
                    <label>
                        <input
                            type={"text"}
                            onChange={event => setSupplies(supplies => props.pet.supplies.map(
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
                            onChange={event => setSupplies(supplies => props.pet.supplies.map(
                                (supply, i) => i === key
                                    ? {...supply, bought: !supply.bought}
                                    : supply
                            ))}
                            checked={supply.bought}/></label>

                    <button
                        type={"button"}
                        onClick={(event) =>
                            setSupplies((supplies) =>
                                props.pet.supplies.filter((supply, i) => i !== key)
                            )
                        }
                    >Delete
                    </button>

                </div>)}

            <button type={"button"}
                    onClick={() => setSupplies([...props.pet.supplies, {id: uuidv4(), nameItem: "", bought: false}])}>Add supply
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