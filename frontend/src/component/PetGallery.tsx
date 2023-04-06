import {Pet} from "../model/Pet"
import PetCard from "./PetCard"
import Layout from "./Layout";
import {useNavigate} from "react-router-dom";
import "../component/PetGallery.css"
import "../component/ButtonAddGallery.css"
import useAuth from "../hooks/useAuth";

type PetGalleryProps = {
    pets: Pet[]
    navigateTo: string | undefined
}

export default function PetGallery(props: PetGalleryProps) {
    const user = useAuth(true)
    const filteredPets = props.pets.filter(pet => pet.userId === user?.id);
    const pets = filteredPets.map((pet: Pet) => {
        return <PetCard key={pet.id} pet={pet} user={user}/>
    })
    const navigate = useNavigate()

    function onClickAdd() {
        if (props.navigateTo) {
            navigate(props.navigateTo)
        }

    }

    return !user ? <>''</> :  (
        <Layout>
            <>
                <h2>All pets</h2>
                <section className={"pet-gallery"}>
                    {pets.length > 0 ? pets : "No pets yet"}<br/>
                </section>
                <div className={"button-add-gallery"} >
                    <button type={"submit"} onClick={onClickAdd}>Add</button>
                </div>
            </>
        </Layout>

    )

}