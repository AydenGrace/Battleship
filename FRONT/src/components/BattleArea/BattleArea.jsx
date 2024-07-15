import React, { useContext } from "react";
import style from "./BattleArea.module.scss";
import Tile from "./components/Tile/Tile";
import { ShipContext } from "../../context/ShipContext";

export default function BattleArea() {
  const { myBattleMap } = useContext(ShipContext);

  return (
    <section className={`${style.BattleArea}`}>
      {myBattleMap.map((Row, ridx) =>
        Row.map((tile, cidx) => (
          <Tile key={`${ridx}_${cidx}`} Value={tile} Column={cidx} Row={ridx} />
        ))
      )}
    </section>
  );
}
