import React from 'react';
import './style/style.css';
import { Link } from 'react-router-dom'
import PokeballImage from '../../img/pokeball.svg';

export default function NavButton({link, title, wip=false}){
    return (
        <Link to={link?link:''}>
            <button className={wip?'navButton wip':'navButton'} type="button">
                <div className="titleDiv">
                    {
                        wip
                        ?<p>{title}<span>(W.I.P)</span></p>
                        :<p>{title}</p>
                    }
                    
                </div>
                <div className="imgDiv">
                    <img src={PokeballImage} alt="pokeball" draggable="false"/>
                </div>
            </button>
        </Link>
    )
}