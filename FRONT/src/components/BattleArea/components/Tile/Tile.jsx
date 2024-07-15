import React, { useContext, useEffect, useState } from "react";
import style from "./Tile.module.scss";
import { ShipContext } from "../../../../context/ShipContext";

export default function Tile({ Value, Column, Row }) {
  const [Pointer, setPointer] = useState("");
  const [EffectBG, setEffectBG] = useState("");
  const { myShips } = useContext(ShipContext);

  useEffect(() => {
    switch (Value.type) {
      case "sea":
        setPointer("pointer");
        break;
      case "ship":
        break;
      case "miss":
        setEffectBG("missed");
        break;
      case "destroyed":
        setEffectBG("destroyed");
        break;
      case "border":
      default:
        break;
    }
    if (Value.type === "border") return;
  }, [myShips]);

  const handleClick = () => {
    switch (Value.type) {
      case "sea":
        console.log(Row, Column);
        break;
      case "ship":
      case "miss":
      case "destroyed":
      case "border":
      default:
        break;
    }
  };
  return (
    <div className={`${style.Tile} f-center ${Pointer}`} onClick={handleClick}>
      <p>{Value.value}</p>
      <div className={`${style.Effect} ${EffectBG}`}></div>
    </div>
  );
}
