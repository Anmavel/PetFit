import {Pet} from "../model/Pet"
import PetCard from "./PetCard"
import Layout from "./Layout";
import {useNavigate} from "react-router-dom";
import "../component/PetGallery.css"
import "../component/ButtonAddGallery.css"
import useAuth from "../hooks/useAuth";
import {useState} from "react";

type PetGalleryProps = {
    pets: Pet[]
    navigateTo: string | undefined

}

export default function PetGallery(props: PetGalleryProps) {

    const PETS_PER_PAGE = 2;
    const [currentPage, setCurrentPage] = useState(1);
    const user = useAuth(true);
    const startIndex = (currentPage - 1) * PETS_PER_PAGE;
    const endIndex = startIndex + PETS_PER_PAGE;
    const petsToDisplay = props.pets.slice(startIndex, endIndex).map((pet: Pet) => {
        return <PetCard key={pet.id} pet={pet} user={user}/>;
    });
    const totalPages = Math.ceil(props.pets.length / PETS_PER_PAGE);
    const navigate = useNavigate()

    function onClickAdd() {
        if (props.navigateTo) {
            navigate(props.navigateTo)
        }
    }

    return !user ? <>''</> : (
        <Layout>
                <h2>All pets</h2>
                <section className={"pet-gallery"}>{petsToDisplay.length > 0 ? petsToDisplay : "No pets yet"}<br/>
                </section>
                <div className={"button-add-gallery"}>
                    <button type={"submit"} onClick={onClickAdd}>
                        Add
                    </button>
                </div>
                <div className="pagination">
                    {Array.from(Array(totalPages), (_, i) => {
                        const pageNumber = i + 1;
                        return (
                            <button
                                key={pageNumber}
                                className={pageNumber === currentPage ? "active" : ""}
                                onClick={() => setCurrentPage(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                        );
                    })}
                </div>
        </Layout>
    )

}