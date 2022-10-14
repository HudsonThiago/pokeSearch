import React, { useState, useEffect } from "react";
import './style/style.css';
import HalftoneImg from '../../img/halftone2.png';
import CloseButtonImage from '../../img/icons/close.svg';
import { closeModal, openModal } from "../../../services/utils";
import Button from "../Button";
export default function Modal({id, children}){

    const [mouseOut, setMouseOut] = useState(false);

    const closeOut =()=> {
        if(mouseOut===true){
            closeModal(id)
        }
    }

    return (
        <div id={'modal-'+id} className="darkScreen" onClick={closeOut}>
            <section className="modalContainer" onMouseOut={()=>setMouseOut(true)} onMouseOver={()=>setMouseOut(false)}>
                <header className="modalHeader">
                    <h3>Advanced Search</h3>
                    <button className="closeButton" onClick={()=>{closeModal(id)}}>
                        <img src={CloseButtonImage} alt="close" draggable="false" />
                    </button>
                </header>
                <main className="modalBody">
                    <div className="modalMain">
                        {children}
                    </div>
                </main>
                <footer className="modalFooter">
                    <Button>Search</Button>
                </footer>
            </section>
        </div>
    )
}