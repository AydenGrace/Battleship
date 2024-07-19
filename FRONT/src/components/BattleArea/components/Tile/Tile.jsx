import React, { useContext, useEffect, useState } from "react";
import style from "./Tile.module.scss";
import { CurrentRoomContext } from "../../../../context/CurrentRoomContext";
import { ShipContext } from "../../../../context/ShipContext";
import { UserContext } from "../../../../context/UserContext";
import toast from "react-hot-toast";
import { Shoot } from "../../../../apis/room";

export default function Tile({ Value, Column, Row, Mode }) {
  const { room } = useContext(CurrentRoomContext);
  const { user } = useContext(UserContext);
  const [Pointer, setPointer] = useState("");
  const [Hover, setHover] = useState("");
  const [EffectBG, setEffectBG] = useState("");
  const {
    TestSwitch,
    myBattleMap,
    setPreparedIndex,
    preparedIndex,
    setShipPosition,
    myShips,
  } = useContext(ShipContext);

  useEffect(() => {
    console.log(Value);
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
    switch (Mode) {
      case "none":
        setHover("");
        setPointer("");
        break;
      case "battle":
        if (Value.type != "border") {
          setHover("BattleHover");
          setPointer("pointer");
        }
        break;
      case "selection":
      case "test":
      default:
        break;
    }
    if (Value.type === "border") return;
  }, [Value, Mode]);

  const handleClick = () => {
    switch (Mode) {
      case "selection":
        console.log(Row, Column, Value.type);
        PrepareMyShips(Row, Column);
        break;
      case "battle":
        console.log("SHOOT", Row, Column);
        console.log(room);
        Shoot(room._id, user._id, Row, Column);
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
    if (Mode === "selection") {
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
