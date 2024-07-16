import { useEffect, useState } from "react";
import { ShipContext } from "../context/ShipContext";

export default function ShipProvider({ children }) {
  let wait = false;

  const setWait = () => {
    wait = !wait;
  };

  const Reset = () => {
    setMyShips([
      { Tiles: 2, Start: [-1, -1], Life: 2, rotated: false },
      { Tiles: 3, Start: [-1, -1], Life: 3, rotated: false },
      { Tiles: 3, Start: [-1, -1], Life: 3, rotated: false },
      { Tiles: 4, Start: [-1, -1], Life: 4, rotated: false },
      { Tiles: 5, Start: [-1, -1], Life: 5, rotated: false },
    ]);
    setEnemyShips([
      { Tiles: 2, Start: [-1, -1], Life: 2, rotated: false },
      { Tiles: 3, Start: [-1, -1], Life: 3, rotated: false },
      { Tiles: 3, Start: [-1, -1], Life: 3, rotated: false },
      { Tiles: 4, Start: [-1, -1], Life: 4, rotated: false },
      { Tiles: 5, Start: [-1, -1], Life: 5, rotated: false },
    ]);
    setMyBattleMap([
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
    setEnemyBattleMap([
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
    setMode("none");
  };

  const [selectedShip, setSelectedShip] = useState(-1);
  const [myShips, setMyShips] = useState([
    { Tiles: 2, Start: [1, 1], Life: 2, rotated: false },
    { Tiles: 3, Start: [5, 2], Life: 3, rotated: true },
    { Tiles: 3, Start: [10, 1], Life: 3, rotated: true },
    { Tiles: 4, Start: [1, 4], Life: 4, rotated: false },
    { Tiles: 5, Start: [1, 5], Life: 5, rotated: false },
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
    { Tiles: 2, Start: [1, 1], Life: 2, rotated: false },
    { Tiles: 3, Start: [1, 2], Life: 3, rotated: false },
    { Tiles: 3, Start: [1, 3], Life: 3, rotated: false },
    { Tiles: 4, Start: [1, 4], Life: 4, rotated: false },
    { Tiles: 5, Start: [1, 5], Life: 5, rotated: false },
  ]);

  const [mode, setMode] = useState("none");
  //none
  //selection
  //battle

  const SettingShips = async (idxShip) => {
    console.log(myShips.length, idxShip);
    if (idxShip >= myShips.length) {
      setMode("none");
      return;
    }
    setMode("selection");

    console.log(`Placez votre navire de taille ${myShips[idxShip].Tiles}`);
  };

  const ShipOnBattlefield = async () => {
    //Change value of the Tiles when a ship is set

    //RESET
    myShips.map((ship, idx) => {
      myBattleMap.map((row, ridx) => {
        row.map((tile, cidx) => {
          if (cidx === 0 || ridx === 0) tile.type = "border";
          else tile.type = "sea";
        });
      });
    });
    //SEARCH SHIPS
    myShips.map((ship, idx) => {
      if (ship.Start[0] > 0 && ship.Start[1] > 0) {
        myBattleMap.map((row, ridx) => {
          // console.log(ridx, ship.Start[1]);
          if (ridx === ship.Start[1]) {
            //Find Row
            row.map((tile, cidx) => {
              if (cidx === ship.Start[0]) {
                //Starting Point Found
                if (ship.rotated) {
                  //Is rotated (Y)
                  for (let i = 0; i < ship.Tiles; i++) {
                    // console.log(`SHIP ${idx} : [${ridx + i},${cidx}]`);
                    if (ridx + i < 11)
                      myBattleMap[ridx + i][cidx].type = "ship";
                  }
                } else {
                  //Is horintaly (X)
                  for (let i = 0; i < ship.Tiles; i++) {
                    // console.log(`SHIP ${idx} : [${ridx},${cidx + i}]`);
                    if (cidx + i < 11)
                      myBattleMap[ridx][cidx + i].type = "ship";
                  }
                }
              }
            });
          }
        });
      }
    });
    setMyBattleMap([...myBattleMap]);
    // console.log(myBattleMap);
  };

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
    setMyBattleMap([...tempBattleMap]);
  };

  useEffect(() => {
    ShipOnBattlefield();
  }, [myShips]);

  return (
    <ShipContext.Provider
      value={{
        myShips,
        setMyShips,
        enemyShips,
        mode,
        setMode,
        myBattleMap,
        TestSwitch,
        setWait,
        SettingShips,
        setSelectedShip,
        selectedShip,
        Reset,
      }}
    >
      {children}
    </ShipContext.Provider>
  );
}
