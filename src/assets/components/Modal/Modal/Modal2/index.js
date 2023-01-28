import Button from "../../../Button";
import "./style/style.css";
import { closeModal } from "../../../../../services/utils";
import { upperCaseFirstLetter } from "../../../../../services/utils";

export default function Modal2({ id, pokemonName }) {
    return (
        <div className="modal2">
            <p className="pModal2">
                Você favoritou o pokemon{" "}
                <span>{upperCaseFirstLetter(pokemonName)}</span>
            </p>
            <Button onClick={() => closeModal(id)}>Ok</Button>
        </div>
    );
}
