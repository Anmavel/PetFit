import {Pet} from "../model/Pet";
import React from "react";
import "./SuppliesDetails.css"


type Props = {
    pet: Pet,

}
export default function SuppliesDetails(props: Props) {
    return (
        <>
            <h6>Supplies:</h6>
            <div className={"supplies-container"}>
                {props.pet.supplies.map((supply) => (
                    <div key={supply.id}>
                        <p className={"supply-item"}>{supply.nameItem}</p>
                        <p className="bought-status"><input type="checkbox" checked={supply.bought} readOnly/></p>
                    </div>
                ))}
            </div>
        </>
    );
}
