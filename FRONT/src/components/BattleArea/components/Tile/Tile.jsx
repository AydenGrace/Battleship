import React, { useContext, useEffect, useState } from "react";
import style from "./Tile.module.scss";
import { ShipContext } from "../../../../context/ShipContext";

export default function Tile({ Value, Column, Row }) {
  const [Pointer, setPointer] = useState("");
  const [Hover, setHover] = useState("");
  const [EffectBG, setEffectBG] = useState("");
  const { TestSwitch, mode, myBattleMap } = useContext(ShipContext);

  useEffect(() => {
    switch (Value.type) {
      case "sea":
        setHover("TileHover");
        setPointer("pointer");
        setEffectBG("");
        break;
      case "ship":
        setHover("");
        setPointer("");
        setEffectBG("");
        break;
      case "miss":
        setHover("");
        setPointer("");
        setEffectBG("missed");
        break;
      case "destroyed":
        setHover("");
        setPointer("");
        setEffectBG("destroyed");
        break;
      case "border":
        setHover("");
        setPointer("");
        setEffectBG("");
        break;
      default:
        setHover("");
        setPointer("");
        setEffectBG("");
        break;
    }
    switch (mode) {
      case "none":
        setHover("");
        setPointer("");
        break;
      case "battle":
        setHover("BattleHover");
        break;
      case "selection":
      case "test":
      default:
        break;
    }
    if (Value.type === "border") return;
  }, [myBattleMap, mode]);

  const handleClick = () => {
    switch (mode) {
      case "selection":
        break;
      case "battle":
        break;
      case "test":
        // TestSwitch(Row, Column);
        console.log(Row, Column, Value.type);
        break;
      case "none":
      default:
        break;
    }
  };

  return (
    <div className={`${style.Tile} f-center ${Pointer} `} onClick={handleClick}>
      <p>{Value.value}</p>
      <div className={`${style.Effect} ${EffectBG} ${Hover}`}></div>
    </div>
  );
}
