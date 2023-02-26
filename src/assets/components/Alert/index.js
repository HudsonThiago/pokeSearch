import React, { useState, useEffect } from "react";
import "./style/style.css";
import HalftoneImg from "../../img/halftone2.png";
import CloseButtonImage from "../../img/icons/close.svg";
import { closeModal, openModal } from "../../../services/utils";
import Button from "../Button";
export default function Modal({ id, action, title, children, footer = false }) {
    const [mouseOut, setMouseOut] = useState(false);
    const [touch, setTouch] = useState(true);

    const closeOut = () => {
        if (mouseOut === true && touch === false) {
            closeModal(id);
        }
    };

    return (
        <div
            id={"modal-" + id}
            className="darkScreen"
            onTouchStart={() => setTouch(true)}
            onMouseMove={() => setTouch(false)}
            onClick={closeOut}
        >
            <section
                className="modalContainer"
                onMouseOut={() => setMouseOut(true)}
                onMouseOver={() => setMouseOut(false)}
            >
                <header className="modalHeader">
                    <h3>{title}</h3>
                    <button
                        className="closeButton"
                        onClick={() => {
                            closeModal(id);
                        }}
                    >
                        <img
                            src={CloseButtonImage}
                            alt="close"
                            draggable="false"
                        />
                    </button>
                </header>
                <main className="modalBody">
                    <div className="modalMain">{children}</div>
                </main>
                {footer ? (
                    <footer className="modalFooter">
                        <Button
                            onClick={() => {
                                closeModal(id);
                                action();
                            }}
                        >
                            Search
                        </Button>
                    </footer>
                ) : null}
            </section>
        </div>
    );
}
