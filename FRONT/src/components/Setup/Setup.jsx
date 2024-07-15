import React, { useContext } from "react";
import style from "./Setup.module.scss";
import { ShipContext } from "../../context/ShipContext";

export default function Setup() {
  const { myShips } = useContext(ShipContext);
  return (
    <div className={`d-flex flex-column ${style.area}`}>
      <h2>Réglages</h2>
      {myShips.map((ship, idx) => (
        <div>
          <p>{`Bateau n°${idx}`}</p>
        </div>
      ))}
      <div></div>
    </div>
  );
}
