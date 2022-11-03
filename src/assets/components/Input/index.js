import React, { useState, useEffect } from "react";
import "./style/style.css";

export default function Input({ children, id, name, icon }) {
  const checkGroup = (e) => {
    const value = e.target.value;

    if (e.target.checked) {
      localStorage.setItem("group", value);
    }
  };

  useEffect(() => {
    localStorage.removeItem("group");
  }, []);

  return (
    <label className="inputContainer" htmlFor={id}>
      <input
        name={name}
        id={id}
        value={id}
        type="radio"
        onChange={(e) => checkGroup(e)}
      />
      <div className="inputLabel">
        <p>{children}</p>
        <img src={icon} alt={"icon-" + id} draggable="false" />
      </div>
    </label>
  );
}
