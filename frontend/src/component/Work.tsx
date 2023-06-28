import React from "react";
import PickPet from "../Assets/Petfit_logo_small_white.png"
import ChoosePet from "../Assets/Choose-image.png"
import PickUpPet from "../Assets/Shopping-list.png"
import NavigationBar from "./NavigationBar";
import {useLocation} from "react-router-dom";


export default function Work() {
    const location = useLocation()
    const workInfoData = [
        {
            image: ChoosePet,
            title: "Choose a name for your new Pet",
            text: "Chocolate or Brownie, you decide"
        },

        {
            image: PickPet,
            title: "Pick a breed or none",
            text: "With the Dog API choose a breed"
        },

        {
            image: PickUpPet,
            title: "Create a supplies list",
            text: "Add, edit and delete items you need for your pet"
        },

    ]
    return (
        <>
            {location.pathname === "/work" && <NavigationBar/>}
            <div className={"work-section-wrapper"}>
                <div className={"work-section-top"}>
                    <p className={"primary-subheading"}>Info</p>
                    <h1 className={"primary-heading"}>How it works</h1>
                    <p className={"primary-text"}>Please sign in and go to "Pets" to add a dog to your gallery. Choose
                        the name, breed and create
                        a supplies list or shopping list for your new pet. With Petfit you will be ready to welcome your
                        new
                        pet! Are you Petfit?</p>
                </div>
                <div className={"work-section-bottom"}>
                    {
                        workInfoData.map((data) => (
                            <div className={"work-section-info"}>
                                <div className={"info-boxes-img-container"}>
                                    <img src={data.image} alt={""}/>
                                </div>
                                <h2>{data.title}</h2>
                                <p>{data.text}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>

    )
}