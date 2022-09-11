import React from "react";
import './style/style.css'

export default function Body({children}){
    return (
        <>
            <header>
                <div className="headerContainer">
                    <div>aaaaaaa</div>
                    <div>bbbbb</div>
                </div>
            </header>
            <main>
                <section className="bodyContainer">
                    {children}
                </section>
            </main>
        </>
    )
}