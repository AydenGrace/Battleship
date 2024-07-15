import { useEffect, useState } from "react";
import { ShipContext } from "../context/ShipContext";

export default function ShipProvider({ children }) {
  const [myShips, setMyShips] = useState([
    { Tiles: 2, Start: [-1, -1], End: [-1, -1], Life: 2 },
    { Tiles: 3, Start: [-1, -1], End: [-1, -1], Life: 3 },
    { Tiles: 3, Start: [-1, -1], End: [-1, -1], Life: 3 },
    { Tiles: 4, Start: [-1, -1], End: [-1, -1], Life: 4 },
    { Tiles: 5, Start: [-1, -1], End: [-1, -1], Life: 5 },
  ]);

  const [myBattleMap, setMyBattleMap] = useState([
    [
      { value: "", type: "border" },
      { value: "A", type: "border" },
      { value: "B", type: "border" },
      { value: "C", type: "border" },
      { value: "D", type: "border" },
      { value: "E", type: "border" },
      { value: "F", type: "border" },
      { value: "G", type: "border" },
      { value: "H", type: "border" },
      { value: "I", type: "border" },
      { value: "J", type: "border" },
    ],
    [
      { value: "1", type: "border" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
    ],
    [
      { value: "2", type: "border" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
    ],
    [
      { value: "3", type: "border" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
    ],
    [
      { value: "4", type: "border" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
    ],
    [
      { value: "5", type: "border" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
    ],
    [
      { value: "6", type: "border" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
    ],
    [
      { value: "7", type: "border" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
    ],
    [
      { value: "8", type: "border" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
    ],
    [
      { value: "9", type: "border" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
    ],
    [
      { value: "10", type: "border" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
    ],
  ]);

  const [enemyBattleMap, setEnemyBattleMap] = useState([
    [
      { value: "\\", type: "border" },
      { value: "A", type: "border" },
      { value: "B", type: "border" },
      { value: "C", type: "border" },
      { value: "D", type: "border" },
      { value: "E", type: "border" },
      { value: "F", type: "border" },
      { value: "G", type: "border" },
      { value: "H", type: "border" },
      { value: "I", type: "border" },
      { value: "J", type: "border" },
    ],
    [
      { value: "1", type: "border" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
    ],
    [
      { value: "2", type: "border" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
    ],
    [
      { value: "3", type: "border" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
    ],
    [
      { value: "4", type: "border" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
    ],
    [
      { value: "5", type: "border" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
    ],
    [
      { value: "6", type: "border" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
    ],
    [
      { value: "7", type: "border" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
    ],
    [
      { value: "8", type: "border" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
    ],
    [
      { value: "9", type: "border" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
    ],
    [
      { value: "10", type: "border" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
      { value: "", type: "sea" },
    ],
  ]);

  const [enemyShips, setEnemyShips] = useState([
    { Tiles: 2, Start: [-1, -1], End: [-1, -1], Life: 2 },
    { Tiles: 3, Start: [-1, -1], End: [-1, -1], Life: 3 },
    { Tiles: 3, Start: [-1, -1], End: [-1, -1], Life: 3 },
    { Tiles: 4, Start: [-1, -1], End: [-1, -1], Life: 4 },
    { Tiles: 5, Start: [-1, -1], End: [-1, -1], Life: 5 },
  ]);

  const [mode, setMode] = useState("none");
  //none
  //selection
  //battle

  const Shoot = () => {};

  const TestSwitch = (row, column) => {
    let tempBattleMap = [...myBattleMap];
    tempBattleMap.map((Row, ridx) => {
      if (ridx === row) {
        Row.map((Column, cidx) => {
          if (cidx === column) {
            switch (Column.type) {
              case "sea":
                Column.type = "miss";
                break;

              case "miss":
                Column.type = "destroyed";
                break;
              case "destroyed":
                Column.type = "sea";
                break;
              case "ship":
              case "border":
              default:
                break;
            }
          }
        });
      }
    });
    setMyShips([...tempBattleMap]);
  };

  return (
    <ShipContext.Provider
      value={{ myShips, enemyShips, setMode, myBattleMap, TestSwitch }}
    >
      {children}
    </ShipContext.Provider>
  );
}
