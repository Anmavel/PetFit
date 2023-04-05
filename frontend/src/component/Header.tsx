import "./Header.css"
import Navigation from "./Navigation";

type HeaderProps = {
    image: string
}
export default function Header(props: HeaderProps) {

    return (
        <>
            <header className={"header"}>
                <div>
                    <img src={props.image} alt={"logo Petfit"}/><br/>
                    <h2>MyPets</h2><br/>
                </div>
            </header>
            <Navigation/>
        </>
    )
}