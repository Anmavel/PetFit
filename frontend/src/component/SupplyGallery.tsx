import {Supply} from "../model/Supply"
import SupplyCard from "./SupplyCard"
import Layout from "./Layout";
import {useNavigate} from "react-router-dom";
import {Pet} from "../model/Pet";

type SupplyGalleryProps = {
    supplies: Supply[]
    pet:Pet
    navigateTo: string | undefined
}

export default function PetGallery(props: SupplyGalleryProps){
    const pet=props.pet
    const supplies = props.supplies.map((supply: Supply) => {
        return <SupplyCard key={supply.id} supply={supply} pet={pet}/>
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
                <h2>All supplies for your Pets</h2>
                <section className={"supply-gallery"}>
                    {supplies.length > 0 ? supplies : "No supplies yet"}<br/>
                </section>
                <div className={"button-add-gallery"} >
                    <button type={"submit"} onClick={onClickAdd}>Add</button>
                </div>
            </>
        </Layout>

    )

}