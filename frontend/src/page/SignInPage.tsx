import Layout from "../component/Layout";
import SignForm from "../component/SignForm";
import "../component/Layout.css"
import {Link} from "react-router-dom";
import React from "react";

export default function SignInPage() {

    return (
        <Layout>
            <div className={"layout-sign-form"}>
                <h1>Sign In</h1>
                <SignForm action={"sign-in"}/>
                <p>Don't have an account yet? Please sign Up</p>
                <Link to={"/sign-up"}>Sign Up</Link>
            </div>
        </Layout>
    );
}