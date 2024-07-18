import React, { useContext, useEffect, useState } from "react";
import style from "./Tile.module.scss";
import { ShipContext } from "../../../../context/ShipContext";
import toast from "react-hot-toast";

export default function Tile({ Value, Column, Row }) {
  const [Pointer, setPointer] = useState("");
  const [Hover, setHover] = useState("");
  const [EffectBG, setEffectBG] = useState("");
  const {
    TestSwitch,
    mode,
    myBattleMap,
    setPreparedIndex,
    preparedIndex,
    setShipPosition,
    myShips,
  } = useContext(ShipContext);

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
        console.log(Row, Column, Value.type);
        PrepareMyShips(Row, Column);
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

  const PrepareMyShips = (Row, Column) => {
    console.log(myShips[preparedIndex]);
    //SI CLICK SUR BORDURE
    if (Row < 1 || Column < 1) {
      toast.error("Impossible de placer un navire sur une bordure");
      return;
    }
    //SI CLICK TROP PROCHE BORD
    if (myShips[preparedIndex].rotated) {
      if (Row + myShips[preparedIndex].Tiles - 1 > 10) {
        toast.error("La navire est trop grand");
        return;
      }
    } else {
      if (Column + myShips[preparedIndex].Tiles - 1 > 10) {
        toast.error("La navire est trop grand");
        return;
      }
    }
    //SI AUTRE NAVIRE DANS LE CHEMIN
    let ThereIsAShip = false;
    let OldShipPosition = [];
    for (let i = 0; i < myShips[preparedIndex].Tiles; i++) {
      if (myShips[preparedIndex].rotated) {
        OldShipPosition.push([
          myShips[preparedIndex].Start[1] + i,
          myShips[preparedIndex].Start[0],
        ]);
      } else {
        OldShipPosition.push([
          myShips[preparedIndex].Start[1],
          myShips[preparedIndex].Start[0] + i,
        ]);
      }
    }
    console.log(OldShipPosition);

    if (myShips[preparedIndex].rotated) {
      for (let i = 0; i < myShips[preparedIndex].Tiles; i++) {
        console.log(myBattleMap[Row + i][Column]);
        if (myBattleMap[Row + i][Column].type === "ship") {
          const found = OldShipPosition.find(
            (pos) => pos[0] === Row + i && pos[1] === Column
          );
          if (found) {
            console.log("IS OLD SHIP POSITION");
          } else {
            console.log("IS ANOTHER SHIP POSITION");
            ThereIsAShip = true;
          }
        }
      }
    } else {
      for (let i = 0; i < myShips[preparedIndex].Tiles; i++) {
        if (myBattleMap[Row][Column + i].type === "ship") {
          const found = OldShipPosition.find(
            (pos) => pos[0] === Row && pos[1] === Column + i
          );
          if (found) {
            console.log("IS OLD SHIP POSITION");
          } else {
            console.log("IS ANOTHER SHIP POSITION");
            ThereIsAShip = true;
          }
        }
      }
    }
    if (ThereIsAShip) {
      toast.error("Un navire est dans le chemin");
      return;
    }
    setShipPosition(preparedIndex, Column, Row);
  };

  const rotate = () => {
    if (mode === "selection") {
      console.log("ROTATE");
    }
  };

  return (
    <div className={`${style.Tile} f-center ${Pointer} `} onClick={handleClick}>
      <p>{Value.value}</p>
      <div className={`${style.Effect} ${EffectBG} ${Hover}`}></div>
    </div>
  );
}
