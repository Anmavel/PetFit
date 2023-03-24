import {Pet} from "../model/Pet";
import React from "react";
import "./PetCard.css"
import {Link} from "react-router-dom";

type Props = {
    pet: Pet,

}
export default function TaskCard(props: Props) {
    return (
        <div className={"petCard"}>
            <h2>{props.pet.name}</h2>
            <h3>{props.pet.nameOfBreed}</h3>
            <img src={props.pet.photo} alt={"logo"}/><br/>
            <Link to={"/pets/"+props.pet.id}>Details</Link>
        </div>
    )
}
