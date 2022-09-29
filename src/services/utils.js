export const upperCaseFirstLetter=(string)=>{
  const upperString = string[0].toUpperCase() + string.substr(1);
  return upperString;
}

export const removeSpecialCharacters=(string)=>{
  if(string.includes('\n')) string.replace('\n', '');
  if(string.includes('\f')) string.replace('\f', '');
  return string;
}

export const convertUnit=(string)=>{
  let convertString = string.toString();
  let returnString = convertString;
  let stringLength = convertString.length;

  if(stringLength === 1) {
    returnString = "0."+convertString;
  } else {
    let sliceString = convertString.slice(0, -1);
    returnString = sliceString+"."+convertString[stringLength-1];
  }

  return returnString;
}

export const convertName=(string, split = false)=>{
  let splitString = string.split("-")
  let stringTotal = "";

  if(split === true){
    if(splitString.length >= 2){
      let aux = splitString[0];
      splitString[0] = splitString[1];
      splitString[1] = aux;
    }
  }

  splitString.forEach((e) => {
    if(e === "gmax") {
      e = "gigantamax"
    }
    if(e === "alola") {
      e = "alolan"
    }
    if(e === "galar") {
      e = "galarian"
    }
    stringTotal += upperCaseFirstLetter(e)+" ";
  });
  
  return stringTotal;
}

export const convertNumber=(number)=>{
  if (number < 10) return "00"+number;
  else if (number >= 10 && number < 100) return "0"+number;
  else return number;
}

export const setLocalStorage=(id, name)=>{
    localStorage.setItem("specieId",id);
    localStorage.setItem("specie",name);
}