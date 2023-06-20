import React from "react";
import PickPet from "../Assets/Petfit_logo_small_white.png"
import ChoosePet from "../Assets/Choose-image.png"
import PickUpPet from "../Assets/Shopping-list.png"


export default function Work() {
    const workInfoData = [
        {
            image: ChoosePet,
            title: "Choose a name for your new Pet",
            text: "Alice or Brownie, you decide"
        },

        {
            image: PickPet,
            title: "Pick a breed or none",
            text: "With the Dog API choose a breed or none"
        },

        {
            image: PickUpPet,
            title: "Create a shopping list",
            text: "Add, Edit and delete tem you need for your pet"
        },

    ]
    return (
        <div className={"work-section-wrapper"}>
            <div className={"work-section-top"}>
                <p className={"primary-subheading"}>Info</p>
                <h1 className={"primary-heading"}>How it works</h1>
                <p className={"primary-text"}>Choose the name, breed and with Petfit collect data about your future pet,
                    save your new pet supply list or shopping list. With Petfit you will be ready to welcome your new
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

    )
}