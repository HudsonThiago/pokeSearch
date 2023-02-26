import React, { useState, useEffect } from "react";
import CheckGeneration from "../../../CheckGeneration";
import icon1 from "../../../../img/icons/gigantamaxIcon.svg";
import icon2 from "../../../../img/icons/megaEvolutionIcon.svg";
import icon3 from "../../../../img/icons/babiesIcon.svg";
import icon4 from "../../../../img/icons/alolanIcon.svg";
import icon5 from "../../../../img/icons/galarianIcon.svg";
import icon6 from "../../../../img/icons/hisuianIcon.svg";
import icon7 from "../../../../img/icons/myticaIcon.svg";
import icon8 from "../../../../img/icons/legendaryIcon.svg";
import Input from "../../../Input";
import ItemBody from "../../../ItemBody";
import SearchBar from "../../../SearchBar";
import TypeInputList from "../../../TypeInputList";
import "./style/style.css";

export default function Modal1() {
    return (
        <>
            <SearchBar id="modalSearch" placeholder="Search" button={false} />
            <div className="mainC">
                <ItemBody className="mt-1" title="Generation">
                    <div className="overflow-x">
                        <CheckGeneration id="1" title="I" value="1" />
                        <CheckGeneration id="2" title="II" value="2" />
                        <CheckGeneration id="3" title="III" value="3" />
                        <CheckGeneration id="4" title="IV" value="4" />
                        <CheckGeneration id="5" title="V" value="5" />
                        <CheckGeneration id="6" title="VI" value="6" />
                        <CheckGeneration id="7" title="VII" value="7" />
                        <CheckGeneration id="8" title="VIII" value="8" />
                        <CheckGeneration id="9" title="IX" value="9" />
                    </div>
                </ItemBody>
            </div>
            <div className="modalColumns">
                <div className="c1">
                    <ItemBody className="mt-1" id="modal-search" title="Forms">
                        <div className="grid2Columns">
                            <div>
                                <Input
                                    id="gigantamaxGroup"
                                    title={"Gigantamax"}
                                    icon={icon1}
                                    name="form"
                                />
                            </div>
                            <div>
                                <Input
                                    id="megaEvolutionGroup"
                                    title={"Mega evolution"}
                                    icon={icon2}
                                    name="form"
                                />
                            </div>
                            <div>
                                <Input
                                    id="babiesGroup"
                                    title={"Babies"}
                                    icon={icon3}
                                    name="form"
                                />
                            </div>
                            <div>
                                <Input
                                    id="alolanGroup"
                                    title={"Alolan forms"}
                                    icon={icon4}
                                    name="form"
                                />
                            </div>
                            <div>
                                <Input
                                    id="galarianGroup"
                                    title={"Galarian forms"}
                                    icon={icon5}
                                    name="form"
                                />
                            </div>
                            <div>
                                <Input
                                    id="hisuianGroup"
                                    title={"Hisuian forms"}
                                    icon={icon6}
                                    name="form"
                                />
                            </div>
                            <div>
                                <Input
                                    id="mythicalGroup"
                                    title={"Mythical"}
                                    icon={icon7}
                                    name="form"
                                />
                            </div>
                            <div>
                                <Input
                                    id="legendaryGroup"
                                    title={"Legendary"}
                                    icon={icon8}
                                    name="form"
                                />
                            </div>
                        </div>
                    </ItemBody>
                </div>
                <div className="c2">
                    <ItemBody className="mt-1" title="Types">
                        <div className="selectTypeContainer">
                            <div className="gradient"></div>
                            <TypeInputList />
                        </div>
                    </ItemBody>
                </div>
            </div>
        </>
    );
}
