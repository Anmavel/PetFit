import React from 'react';
import Footer from "./component/Footer";
import './App.css';
import {Route, Routes} from "react-router-dom";
import PetGallery from "./component/PetGallery";
import SupplyGallery from "./component/SupplyGallery";
import usePets from "./hooks/usePets"
import AddPet from "./page/AddPet";
import PetDetails from "./page/PetDetails";
import UpdatePet from "./page/UpdatePet";

function App() {
    const {pets, postNewPet,updatePet,deletePet} = usePets();
    

    return (
        <div className="App">

            <Routes>
                <Route path={"/"} element={<PetGallery pets={pets} navigateTo={"/pets/add"}/>}/>
                <Route path={"/pets"} element={<PetGallery pets={pets} navigateTo={"/pets/add"}/>}/>
                <Route path={"/pets/add"} element={<AddPet  onAdd={postNewPet}/>}/>
                <Route path={"/pets/:id"} element={<PetDetails pets={pets} deletePet={deletePet}/>}/>
                <Route path={"/pets/:id/update"} element={<UpdatePet onUpdate={updatePet} pets={pets}/>}/>
                <Route path={"/pets/:id/update/supplies"} element={<SupplyGallery navigateTo={"/pets"} supplies={supplies}/>}/>
                

            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
