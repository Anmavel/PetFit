import "./Footer.css"
import {BsGithub} from "react-icons/bs";
import {SiLinkedin} from "react-icons/si";
import Logo from "../Assets/Petfit_logo_small_white.png"

export default function Footer() {
    const today = new Date()
    return (
        <div className="footer-wrapper">
            <div className="footer-section-one">
                <div className="footer-logo-container">
                    <img src={Logo} alt=""/>
                </div>
                <div className="footer-icons">
                    <SiLinkedin/>
                    <BsGithub/>
                </div>
            </div>
            <div className="footer-section-two">
                <div className="footer-section-columns">
                    <span>000-0000-0000</span>
                    <span>contact@petfit.com</span>
                </div>
                <div className="footer-section-columns">
                    <span>copyright &copy;{today.getFullYear()}</span>
                    <span>Fotos von <a
                        href="https://unsplash.com/ko/@marliesestreefland?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Milli</a>
                & von <a
                            href="https://unsplash.com/ko/@karsten116?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Karsten
                    Winegeart</a> auf <a
                            href="https://unsplash.com/de/s/fotos/dog?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
            </span>
                    <span>Terms & Conditions</span>
                    <span>Privacy Policy</span>
                </div>
            </div>
        </div>
    );
}
