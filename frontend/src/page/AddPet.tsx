import {Pet} from "../model/Pet";
import SubmitForm from "../component/SubmitForm";
import Layout from "../component/Layout";

type Props = {
    onAdd: (newPet: Pet) => Promise<void>
}

export default function AddTask(props: Props) {

    return (
        <Layout>
            <h2>Please Register your new Pet</h2>
            <SubmitForm navigateTo={"/pets"} onSubmit={props.onAdd} action={"add"}  pet={{name:"", nameOfBreed:"", photo:"",supplies:[]}}/>
        </Layout>
    )

}