import React from "react";
import './style/style.css';

export default function ItemBody({title, children, className}){

    return (
        <div className={`ItemBodyContent ${className}`}>
            <div className="ItemBodyHeaderContent">
                <h3>{title}</h3>
            </div>
            <div className="ItemBodyMain">
                {children}
            </div>
        </div>
    )
}