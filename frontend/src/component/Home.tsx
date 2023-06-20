import React from "react";
import NavigationBar from "./NavigationBar";
import BannerBackground from "../Assets/Banner_Stains.jpeg"
import BannerImage from "../Assets/Dog_Milli_Round.png"
import {FiArrowRight} from "react-icons/fi";
import About from "./About";
import {useNavigate} from "react-router-dom";
import Work from "./Work";
import Testimonials from "./Testimonials";

export default function Home() {
    const navigate = useNavigate()

    function handleClickRegister() {
        navigate("/sign-up")

    }

    return (
        <>
            <div className={"home-container"}>
                <NavigationBar/>
                <div className={"home-banner-container"}>
                    <div className={"home-bannerImage-container"}>
                        <img src={BannerBackground} alt={""}/>
                    </div>
                    <div className={"home-text-section"}>
                        <h1 className={"primary-heading"}>
                            Your favorite App to welcome a new Pet
                        </h1>
                        <p className={"primary-text"}>
                            A pet is a new family member and Petfit helps you to be ready to adopt your new special one
                        </p>
                        <button onClick={handleClickRegister} className={"secondary-button"}>
                            Register Now <FiArrowRight/>
                        </button>
                    </div>
                    <div className={"home-image-section"}>
                        <img src={BannerImage} alt={""}/>
                    </div>
                </div>
            </div>
            <About/>
            <Work/>
            <Testimonials/>
        </>
    )

}
