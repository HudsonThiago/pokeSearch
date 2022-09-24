import React from "react";
import './style/style.css';
import QuestionImg from "../../img/icons/question.svg";
export default function AbilityBox({ability, index}){

    const handleClickAbilityBox=()=>{
        const content = document.getElementById(`main-${index}`);
        content.classList.toggle("active");
        console.log(index)
    }

    return (
        <div className="abilityBox">
            <div className="abilityBoxTitleContent" onClick={handleClickAbilityBox}>
                <div className="abilityIconBox">
                    <div className="abilityIconCircle">
                        <img src={QuestionImg} />
                    </div>
                    <p>{ability.name}</p>
                </div>
                <div></div>
            </div>
            <div id={`main-${index}`} className="abilityBoxMain">
                <p>Lorem Ipsum</p>
            </div>
        </div>
    )
}