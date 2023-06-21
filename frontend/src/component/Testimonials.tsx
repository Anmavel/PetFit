import ProfilePicture from "../Assets/john-doe-image.png"
import {AiFillStar} from "react-icons/ai";

export default function Testimonials(){
    return(
        <div className="work-section-wrapper">
            <div className="work-section-top">
                <p className="primary-subheading">Testimonial</p>
                <h1 className="primary-heading">What They Are Saying</h1>
                <p className="primary-text">
                    Discover what our satisfied customers have to say about our App
                </p>
            </div>
            <div className="testimonial-section-bottom">
                <img src={ProfilePicture} alt="" />
                <p>
                    Awesome App. It helped me to adopt Bruno and we are inseparable!
                </p>
                <div className="testimonials-stars-container">
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                </div>
                <h2>John Doe</h2>
            </div>
        </div>
    );
}