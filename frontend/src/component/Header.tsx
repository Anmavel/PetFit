import "./Header.css"

type HeaderProps={
    image:string
}
export default function Header(props:HeaderProps){

    return(

        <header className={"header"}>
            <img src={props.image} alt={"logo Petfit"}/><br/>
            <br/><h2>MyPets</h2><br/>
        </header>
    )
}