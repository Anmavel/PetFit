import {Pet} from "../model/Pet"
import PetCard from "./PetCard"
import Layout from "./Layout";
import {useNavigate} from "react-router-dom";

type PetGalleryProps = {
    pets:Pet[],

    navigateTo:string|undefined
}

export default function PetGallery(props: PetGalleryProps){
    const pets=props.pets.map((pet:Pet )=>{
        return <PetCard key={pet.id} pet={pet}/>
    })
    const navigate=useNavigate()
    function onClickAdd(){
        if(props.navigateTo){
            navigate(props.navigateTo)
        }

    }

    return (
      <Layout>
          <h2>All Pets</h2>
          <section className={"Pet-Gallery"}>
              {pets.length>0 ? pets:"No Pets yet"}<br/>
              <button type={"submit"} onClick={onClickAdd}> Add </button>
          </section>
      </Layout>


  )

}