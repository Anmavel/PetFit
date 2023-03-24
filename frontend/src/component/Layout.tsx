import React, {ReactNode} from "react";
import Header from "./Header";

type Props = {
    children: ReactNode;
}
export default function Layout({children}: Props) {
    return (
        <>
            <Header image={"/petfit_logo_small.png"}/>
            <main className={"main-content"}>
                {children}
            </main>
        </>
    );
}
