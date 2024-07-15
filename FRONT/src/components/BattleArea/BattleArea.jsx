import React from "react";
import style from "./BattleArea.module.scss";
import Tile from "./components/Tile/Tile";

export default function BattleArea() {
  const Tiles = [
    ["\\", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    ["1", "", "", "", "", "", "", "", "", "", ""],
    ["2", "", "", "", "", "", "", "", "", "", ""],
    ["3", "", "", "", "", "", "", "", "", "", ""],
    ["4", "", "", "", "", "", "", "", "", "", ""],
    ["5", "", "", "", "", "", "", "", "", "", ""],
    ["6", "", "", "", "", "", "", "", "", "", ""],
    ["7", "", "", "", "", "", "", "", "", "", ""],
    ["8", "", "", "", "", "", "", "", "", "", ""],
    ["9", "", "", "", "", "", "", "", "", "", ""],
    ["10", "", "", "", "", "", "", "", "", "", ""],
  ];

  return (
    <section className={`${style.BattleArea}`}>
      {Tiles.map((Row, ridx) =>
        Row.map((column, cidx) => (
          <Tile
            key={`${ridx}_${cidx}`}
            Value={column}
            Column={cidx}
            Row={ridx}
          />
        ))
      )}
    </section>
  );
}
