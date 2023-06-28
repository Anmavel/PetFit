import Layout from "../component/Layout";
import SignForm from "../component/SignForm";
import "../component/Layout.css"


export default function SignUpPage() {

    return (
        <Layout>
            <div className={"layout-sign-form"}>
                <h1>Sign Up</h1>
                <SignForm action={"sign-up"}/>
            </div>
        </Layout>
    );
}