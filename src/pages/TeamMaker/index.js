import React from "react";
import Body from "../../assets/components/Body";
import Header from "../../assets/components/Header";
import halftoneImg from "../../assets/img/halftone.png";
import "./style/style.css";

export default function TeamMaker() {
    return (
        <Body>
            <Header title="Team Maker" />
            <div className="mainContent">
                <div className="teamMakerMainFrame">
                    <div className="c1">
                        <div className="frame">
                            <img
                                className="imagebg"
                                src={halftoneImg}
                                alt="halftone"
                            />
                        </div>
                    </div>
                    <div className="c2"></div>
                </div>
            </div>
        </Body>
    );
}
