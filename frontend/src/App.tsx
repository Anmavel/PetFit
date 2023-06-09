import React from 'react';
import Footer from "./component/Footer";
import './App.css';
import {Route, Routes} from "react-router-dom";
import PetGallery from "./component/PetGallery";
import usePets from "./hooks/usePets"
import AddPet from "./page/AddPet";
import PetDetails from "./page/PetDetails";
import UpdatePet from "./page/UpdatePet";
import SuppliesForm from "./page/SuppliesForm";
import SignUpPage from "./page/SignUpPage";
import axios from "axios";
import Cookies from "js-cookie";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SignInPage from "./page/SignInPage";
import Home from "./component/Home";
import About from "./component/About";
import Work from "./component/Work";
import Testimonials from "./component/Testimonials";
import Contact from "./component/Contact"

axios.interceptors.request.use(function (config) {
    return fetch("/api/csrf").then(() => {
        config.headers["X-XSRF-TOKEN"] = Cookies.get("XSRF-TOKEN");
        return config;
    });
}, function (error) {
    return Promise.reject(error);
});
function App() {
    const {pets, postNewPet,updatePet,deletePet} = usePets();

    return (
        <div className="App">

            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/about"} element={<About/>}/>
                <Route path={"/work"} element={<Work/>}/>
                <Route path={"/testimonials"} element={<Testimonials/>}/>
                <Route path={"/sign-up"} element={<SignUpPage/>}/>
                <Route path={"/sign-in"} element={<SignInPage/>}/>
                <Route path={"/pets"} element={<PetGallery pets={pets} navigateTo={"/pets/add"}/>}/>
                <Route path={"/pets/add"} element={<AddPet  onAdd={postNewPet}/>}/>
                <Route path={"/pets/:id"} element={<PetDetails pets={pets} deletePet={deletePet}/>}/>
                <Route path={"/pets/:id/update"} element={<UpdatePet onUpdate={updatePet} pets={pets}/>}/>
                <Route path={"/pets/:id/supplies"} element={<SuppliesForm pets={pets} onUpdate={updatePet}/>}/>
                <Route path={"/contact"} element={<Contact/>}/>
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <ToastContainer/>
            <Footer/>
        </div>
    );
}

export default App;
