import React, {ReactNode} from "react";
import "./Main-content.css"
import NavigationBar from "./NavigationBar";

type Props = {
    children: ReactNode;
}
export default function Layout({children}: Props) {
    return (
        <>
            <NavigationBar/>
            <main className={"main-content"}>{children}</main>
        </>
    );
}
