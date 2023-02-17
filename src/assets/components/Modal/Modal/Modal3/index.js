import { useState, useEffect } from "react";
import "./style/style.css";
import halftone from "../../../../../assets/img/halftone6.png";
import { getPokemonVarieties } from "../../../../../services/pokemon/pokemonService";
import CardMobile from "../../../CardMobile";
import { convertName } from "../../../../../services/utils";

export default function Modal3({ varieties, image }) {
    const [varietieList, setVarietieList] = useState([]);

    useEffect(() => {
        (async () => {
            let interval = await getPokemonVarieties(varieties);
            setVarietieList(interval);
        })();
    }, []);

    return (
        <div className="modal3">
            <div className="variant-col1">
                <img
                    className="halftoneShadow"
                    src={halftone}
                    draggable="false"
                />
                <img
                    className="pokemonImage"
                    src={image}
                    id="pokemonImage"
                    draggable="false"
                />
            </div>
            {varietieList.length ? (
                <div className="variant-col2">
                    {varietieList.map((p, index) => (
                        <div key={"varietie-" + index}>
                            <CardMobile
                                key={"varietie-" + p.id}
                                id={p.id}
                                index={index}
                                name={convertName(p.name)}
                                url={p.name}
                                image={
                                    p.sprites.other["official-artwork"]
                                        .front_default
                                }
                                types={p.types}
                                modal={3}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="variant-col2">Loading...</div>
            )}
        </div>
    );
}
