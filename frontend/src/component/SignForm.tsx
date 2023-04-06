import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import "./SignForm.css"
import {toast} from "react-toastify";

type Props = {
    action: "sign-up" | "sign-in"
}

export default function SignForm(props: Props) {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    function handleUsernameChange(event: ChangeEvent<HTMLInputElement>) {
        setUsername(event.currentTarget.value)
    }

    function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.currentTarget.value)
    }

    function formSubmitHandler(event: FormEvent<HTMLFormElement>) {
        const btoaString = `${username}:${password}`
        const url = "/api/users"
        const data = props.action === "sign-up" ?{username, password}:{}
        const config = props.action === "sign-up" ?{} :{headers: {Authorization: `Basic ${window.btoa(btoaString)}`}}
        const navigateTo = "/pets";
        event.preventDefault();
        axios.post(url, data, config)
            .then(() => {
                if (props.action==="sign-up"){
                    toast(" 🎉 you were successfully registered")
                }
                navigate(navigateTo);
            }).catch(err => {
            console.error(err);
            toast(" ❌ Error: missing Name or Password or user already exists ")
        });
    }

    return (
        <form className={"signup-form"} onSubmit={formSubmitHandler}>
            <div>
                <label>
                    Username<br/>
                    <input
                        type="text"
                        value={username}
                        placeholder={"username"}
                        onChange={handleUsernameChange}
                    />
                </label>
            </div>

            <div>
                <label>
                    Password<br/>
                    <input
                        type="password"
                        value={password}
                        placeholder={"password"}
                        onChange={handlePasswordChange}
                    />
                </label>
            </div>

            <button type="submit">
                {props.action === "sign-up" && "Sign Up"}
            </button>
        </form>
    )
}