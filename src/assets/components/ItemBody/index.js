import React from "react";
import './style/style.css';

export default function ItemBody({title, children}){

    return (
        <div className="ItemBodyContent">
            <div className="ItemBodyHeaderContent">
                <h3>{title}</h3>
            </div>
            <div className="ItemBodyMain">
                {children}
            </div>
        </div>
    )
}