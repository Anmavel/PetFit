import {Supply} from "../model/Supply";
import React, {ChangeEvent, useState} from "react";
import {Link} from "react-router-dom";
import {Pet} from "../model/Pet";
import {Simulate} from "react-dom/test-utils";
import emptied = Simulate.emptied;

type Props = {
    supply: Supply,
    pet:Pet

}
export default function SupplyCard(props: Props) {

    function handleDeleteButton() {



    }

    function handleEdit() {

    }

    return (
        <div className={"petCard"}>
            <h2>{props.supply.nameItem}</h2>
            <h3>{props.supply.bought}</h3>
            <button onClick={handleDeleteButton}>Delete</button>
            <button onClick={handleEdit}>Edit</button>
            <Link to={"/pets/"+props.pet.id+"/supplies"}>Details</Link>
        </div>
    )
}
