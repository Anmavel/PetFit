import React from 'react';
import Footer from "./component/Footer";
import './App.css';
import {Route, Routes} from "react-router-dom";
import PetGallery from "./component/PetGallery";
import usePets from "./hooks/usePets"
import AddPet from "./page/AddPet";
function App() {
    const {pets, postNewPet}=usePets();

  return (
    <div className="App">

        <Routes>
            <Route path={"/"} element={<PetGallery pets={pets} navigateTo={"/pets/add"}/>}/>
            <Route path={"/pets"} element={<PetGallery pets={pets} navigateTo={"/pets/add"}/>}/>
            <Route path={"/pets/add"} element={<AddPet  navigateTo={"/pets/"} onSubmit={postNewPet}/>}/>

        </Routes>
      <Footer/>
    </div>
  );
}

export default App;
