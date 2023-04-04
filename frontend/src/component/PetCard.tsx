import {Pet} from "../model/Pet";
import React, {useState} from "react";
import "./PetCard.css"
import {Link} from "react-router-dom";

type Props = {
    pet: Pet,

}
export default function PetCard(props: Props) {
    const [imgSrc, setImgSrc] = useState(props.pet.photo);
    return (
        <div className={"petCard"}>
            <h2>{props.pet.name}</h2>
            <h3>{props.pet.nameOfBreed}</h3>
            <img src={imgSrc} onError={()=> setImgSrc("/petfit_logo_small_icon_only_inverted.png")} alt={"logo"}/><br/>
            <Link to={"/pets/"+props.pet.id}>Details</Link>
        </div>
    )
}
