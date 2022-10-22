import React, {useState, useEffect} from "react";
import './style/style.css';
import QuestionImg from "../../img/icons/question.svg";
import { getPokemonAbility } from "../../../services/pokemon/pokemonService";
import { convertName } from "../../../services/utils";


export default function AbilityBox({ability, index}){

    const [abilityObject, setAbilityObject] = useState(null);
    const [abilityText, setAbilityText] = useState("");

    const handleClickAbilityBox=()=>{
        const content = document.getElementById(`main-${index}`);
        content.classList.toggle("activeAbility");
    }

    useEffect(()=>{
        
        const getAbility = async () => {
            try {
                const abilityUrl = ability.url.split('/');
                const abilityId = abilityUrl[abilityUrl.length-2];

                const response = await getPokemonAbility(abilityId);

                if (response.status === 200) {
                    const ability = response.data;
                    setAbilityObject(ability);
                    
                    const translatedAbilities = ability.flavor_text_entries.filter((t, index)=>t.language.name==="en")
                    setAbilityText(translatedAbilities.at(-1));
                }
            } catch (error) {
            }
        }
        
        getAbility();
    }, [ability])

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
                        <p>{abilityText.flavor_text}</p>
                    </div>
                </div>
            )}
        </>
    )
}