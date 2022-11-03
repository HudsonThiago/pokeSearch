import React, { useState, useEffect } from "react";
import { getTypeById } from "../../../services/pokemon/pokemonService";
import TypeBox from "../TypeBox";

export default function WeaknessBox({ pokemon }) {
  const [typeList, setTypeList] = useState(null);
  const [doubleDamage, setDoubleDamage] = useState([]);
  const [halfDamage, setHalfDamage] = useState([]);
  const [weakness, setWeakness] = useState([]);

  useEffect(() => {
    const getType = async () => {
      let TypeListAux = [];
      let doubleDamageAux = [];
      let halfDamageAux = [];

      for (let i = 0; i <= pokemon.types.length - 1; i++) {
        const pokemonTypeUrl = pokemon.types[i].type.url.split("/");
        const typeId = pokemonTypeUrl[pokemonTypeUrl.length - 2];

        try {
          const response = await getTypeById(typeId);

          if (response.status === 200) {
            let type = response.data;
            TypeListAux.push(type);

            let doubleDamageList = type.damage_relations.double_damage_from;
            let halfDamageList = type.damage_relations.half_damage_from;

            doubleDamageList.forEach((t) => {
              let TypeIsEmpty = true;

              doubleDamageAux.forEach((e) => {
                if (e.name === t.name) {
                  TypeIsEmpty = false;
                  e.quadrupleDamage = true;
                }
              });

              if (TypeIsEmpty === true) {
                doubleDamageAux.push(t);
              }
            });

            halfDamageList.forEach((t) => {
              halfDamageAux.push(t);
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
      setTypeList(TypeListAux);
      setDoubleDamage(doubleDamageAux);
      setHalfDamage(halfDamageAux);
    };

    getType();
  }, [pokemon]);

  useEffect(() => {
    getWeaknessList();
  }, [halfDamage]);

  const getWeaknessList = () => {
    const weaknessList = doubleDamage.filter((t) => {
      let TypeIsEmpty = true;

      halfDamage.forEach((e) => {
        if (e.name === t.name) {
          TypeIsEmpty = false;
        }
      });

      if (TypeIsEmpty === true) {
        return true;
      } else {
        return false;
      }
    });

    setWeakness(weaknessList);
  };

  return (
    <>
      {weakness && (
        <div className="grid3Columns">
          {weakness.map((t, index) => {
            return <TypeBox key={`type-${index}`} type={t} />;
          })}
        </div>
      )}
    </>
  );
}
