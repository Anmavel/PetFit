import {Pet} from "../model/Pet";
import React from "react";
import "./PetCard.css"


type Props = {
    pet: Pet,

}
export default function TaskCard(props: Props) {
    return (
        <div className={"petCard"}>
            <h2>{props.pet.name}</h2>

        </div>
    )
}
