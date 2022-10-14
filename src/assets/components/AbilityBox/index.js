import React, {useState, useEffect} from "react";
import './style/style.css';
import QuestionImg from "../../img/icons/question.svg";
import { getPokemonAbility } from "../../../services/pokemon/pokemonService";
import { convertName } from "../../../services/utils";


export default function AbilityBox({ability, index}){

    const [abilityObject, setAbilityObject] = useState(null);

    const handleClickAbilityBox=()=>{
        const content = document.getElementById(`main-${index}`);
        content.classList.toggle("activeAbility");
    }

    const verifyBox=()=>{
        let box = document.getElementById(`main-${index}`);
        if(box.classList.contains("activeAbility")){
            box.classList.remove("activeAbility");
        }
    }

    useEffect(()=>{
        
        const getAbility = async () => {
            try {
                const abilityUrl = ability.url.split('/');
                const abilityId = abilityUrl[abilityUrl.length-2];

                const response = await getPokemonAbility(abilityId);

                if (response.status === 200) {
                    setAbilityObject(response.data);
                }
            } catch (error) {

            }
        }
        
        getAbility();
    }, [])

    return (
        <>
            {abilityObject !== null && (
                <div className="abilityBox">
                    <div className="abilityBoxTitleContent" onClick={handleClickAbilityBox}>
                        <div className="abilityIconBox">
                            <div className="abilityIconCircle">
                                <img src={QuestionImg} draggable="false"/>
                            </div>
                            <p>{convertName(ability.name)}</p>
                        </div>
                        <div>
                        </div>
                    </div>
                    <div id={`main-${index}`} className="abilityBoxMain">
                        <p>{abilityObject.flavor_text_entries[0].flavor_text}</p>
                    </div>
                </div>
            )}
        </>
    )
}