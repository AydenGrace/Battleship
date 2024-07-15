import React, { useContext, useEffect, useState } from "react";
import style from "./BattleArea.module.scss";
import Tile from "./components/Tile/Tile";
import { ShipContext } from "../../context/ShipContext";
import Ship from "../Ship/Ship";

export default function BattleArea() {
  const { myBattleMap, SettingShips, myShips, setMode, mode } =
    useContext(ShipContext);
  const [TileSize, setTileSize] = useState(50);
  const [idx, setIdx] = useState(0);

  const ResetShips = () => {
    for (let i = 0; i < 5; i++)
      document.getElementById(`ship_${i}`).style.display = "none";
  };

  const ShowShip = () => {
    if (idx > 5 || idx === 0) return;
    document.getElementById(`ship_${idx - 1}`).style.display = "block";
  };

  const changeMode = () => {
    switch (mode) {
      case "selection":
        setMode("battle");
        break;
      case "battle":
        setMode("test");
        break;
      case "test":
        setMode("none");
        break;
      case "none":
      default:
        setMode("selection");
        break;
    }
  };

  return (
    <section className={`${style.BattleArea}`}>
      {myShips.map((ship, idx) => (
        <Ship
          key={`ship_${idx}`}
          id={idx}
          nbTiles={ship.Tiles}
          TileSize={TileSize}
          X={ship.Start[0]}
          Y={ship.Start[1]}
          isRotated={ship.rotated}
        />
      ))}
      {myBattleMap.map((Row, ridx) =>
        Row.map((tile, cidx) => (
          <Tile key={`${ridx}_${cidx}`} Value={tile} Column={cidx} Row={ridx} />
        ))
      )}
      {/* <button
        onClick={() => {
          setIdx(idx + 1);
        }}
      >
        Next Ship
      </button> */}
      <button
        onClick={() => {
          changeMode();
        }}
      >
        Change mode : {mode}
      </button>
    </section>
  );
}
