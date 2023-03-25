import {Pet} from "../model/Pet"
import PetCard from "./PetCard"
import Layout from "./Layout";
import {useNavigate} from "react-router-dom";
import "../component/PetGallery.css"
import "../component/ButtonAddGallery.css"

type PetGalleryProps = {
    pets: Pet[],

    navigateTo: string | undefined
}

export default function PetGallery(props: PetGalleryProps) {
    const pets = props.pets.map((pet: Pet) => {
        return <PetCard key={pet.id} pet={pet}/>
    })
    const navigate = useNavigate()

    function onClickAdd() {
        if (props.navigateTo) {
            navigate(props.navigateTo)
        }

    }

    return (
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