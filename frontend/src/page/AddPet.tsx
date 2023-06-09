import {Pet} from "../model/Pet";
import SubmitForm from "../component/SubmitForm";
import Layout from "../component/Layout";

type Props = {
    onAdd: (newPet: Pet) => Promise<void>
}

export default function AddPet(props: Props) {

    return (
        <Layout>
            <div className={"layout-sign-form"}>
                <h2>Please Register your new Pet</h2>
                <SubmitForm navigateTo={"/pets"} onSubmit={props.onAdd} action={"add"}  pet={{name:"", nameOfBreed:[], photo:"",supplies:[]}}/>
            </div>
        </Layout>
    )

}