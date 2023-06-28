import React from "react"
import AboutBackground from "../Assets/Banner_Paws_Street.jpeg"
import AboutBackgroundImage from "../Assets/Dog_Karsten_Round.png"
import {BsFillPlayCircleFill} from "react-icons/bs";
import {useLocation} from "react-router-dom";
import NavigationBar from "./NavigationBar";

export default function About(){
    const location = useLocation();
      function handleWatchVideo() {
        window.location.replace('https://www.youtube.com/watch?v=xvFZjo5PgG0');
    }

    return(
        <>
        {location.pathname === "/about" && <NavigationBar/>}
        <div className={"about-section-container"}>
            <div className={"about-background-image-container"}>
                <img src={AboutBackground} alt={""}/>
            </div>
            <div className={"about-section-image-container"}>
                <img src={AboutBackgroundImage} alt={""}/>
            </div>
            <div className={"about-section-text-container"}>
                <p className={"primary-subheading"}>About</p>
                <h1 className={"primary-heading"}>Pets are an important part of your life</h1>
                <p className={"primary-text"}>Choose the name, breed and with Petfit collect data about your future pet, save your new pet supply list or shopping list.</p>
                <div className={"about-buttons-container"}>
                    <button className={"secondary-button"}>Learn more</button>
                    <button  onClick={handleWatchVideo} className={"watch-video-button"}><BsFillPlayCircleFill/>Watch Video</button>
                </div>
            </div>
        </div>
        </>
    )

}