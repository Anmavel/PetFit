import "./Header.css"

type HeaderProps = {
    image: string
}
export default function Header(props: HeaderProps) {

    return (
        <>
            <header className={"header"}>
                <div>
                    <img src={props.image} alt={""}/><br/>
                </div>
            </header>
        </>
    )
}