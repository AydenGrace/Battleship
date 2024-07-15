import React, { useContext, useEffect, useState } from "react";
import style from "./Tile.module.scss";
import { ShipContext } from "../../../../context/ShipContext";

export default function Tile({ Value, Column, Row }) {
  const [Pointer, setPointer] = useState("");
  const [Hover, setHover] = useState("");
  const [EffectBG, setEffectBG] = useState("");
  const { myShips, TestSwitch, setWait, myBattleMap } = useContext(ShipContext);

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
    if (Value.type === "border") return;
  }, [myBattleMap]);

  const handleClick = () => {
    switch (Value.type) {
      case "sea":
      case "ship":
      case "miss":
      case "destroyed":
      case "border":
      default:
        break;
    }
    TestSwitch(Row, Column);
  };
  return (
    <div className={`${style.Tile} f-center ${Pointer} `} onClick={handleClick}>
      <p>{Value.value}</p>
      <div className={`${style.Effect} ${EffectBG} ${Hover}`}></div>
    </div>
  );
}
