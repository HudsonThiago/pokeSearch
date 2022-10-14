import React, {useState, useEffect} from "react";
import './style/style.css';
import ArrowUpImage from '../../img/icons/arrowUp.svg';
import ArrowDownImage from '../../img/icons/arrowDown.svg';
import { convertName } from "../../../services/utils";
import { Link, useParams } from 'react-router-dom';

export default function VariantBox({pokemon, specie}){

    const [image, setImage] = useState(ArrowDownImage)
    const [imageControl, setImageControl] = useState(false)
    const [name, setName] = useState(pokemon.name)

    const handleClickVariantBox=()=>{
        const variantBox = document.getElementById("variantNavbar");
        variantBox.classList.toggle("active");
        setImageControl(!imageControl)
        if(imageControl === false){
            setImage(ArrowUpImage)
        } else {
            setImage(ArrowDownImage)
        }
    }

    useEffect(()=>{
        setName(pokemon.name)
    }, [pokemon])

    return (
        <>
            {specie.varieties.length > 1
            ? (
                <div id="variantNavbar" className='variantPokemonBox' onClick={handleClickVariantBox}>
                    <div className='variantPokemonButton'>
                        <p>{convertName(name, true)}</p>
                        <img src={image} draggable="false"/>
                    </div>
                    <div className="variantNavbar">
                        <ul>
                            {specie.varieties.map((v, index)=>(
                                <div key={index}>
                                    {name === v.pokemon.name
                                        ?(<li className="navActive"><p>{convertName(v.pokemon.name, true)}</p></li>)
                                        :(<Link to={"/pokemon/"+v.pokemon.name}><li><p>{convertName(v.pokemon.name, true)}</p></li></Link>)
                                    }
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>)
            : null
            }
        </>
    )
}