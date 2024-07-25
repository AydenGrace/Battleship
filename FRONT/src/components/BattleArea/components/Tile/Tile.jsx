import React, { useContext, useEffect, useState } from "react";
import style from "./Tile.module.scss";
import { CurrentRoomContext } from "../../../../context/CurrentRoomContext";
import { ShipContext } from "../../../../context/ShipContext";
import { UserContext } from "../../../../context/UserContext";
import toast from "react-hot-toast";
import { Shoot } from "../../../../apis/room";
import destroyed_sound from "../../../../assets/sounds/destroyed_sound.mp3";
import miss_sound from "../../../../assets/sounds/miss_sound.mp3";

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
    stopTimer,
  } = useContext(ShipContext);

  /******************************************************************************/
  /* Function name : -                                                          */
  /* Description : refresh hooks when passed values are changed                 */
  /* Other functions called : -                                                 */
  /******************************************************************************/
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
  }, [Value, Mode, myBattleMap]);

  /**********************************************************************************/
  /* Function name : handleClick                                                    */
  /* Description : Call function depending of the current game mode and play audios */
  /* Other functions called : prepareMyShips, Shoot (room.js), stopTimer (provider) */
  /**********************************************************************************/
  const handleClick = async () => {
    switch (Mode) {
      case "selection":
        // console.log(Row, Column, Value.type);
        PrepareMyShips(Row, Column);
        break;
      case "battle":
        // console.log("SHOOT", Row, Column);
        // console.log(room);
        stopTimer();
        const response = await Shoot(room._id, user._id, Row, Column);
        if (response.message) {
          switch (response.message) {
            case "destroyed":
              const sound = new Audio(destroyed_sound);
              sound.play();
              if (response.sink) {
                toast("Touché Coulé !", {
                  icon: "💣",
                });
              } else {
                toast("Touché !", {
                  icon: "💣",
                });
              }

              break;
            case "miss":
              const misssound = new Audio(miss_sound);
              misssound.play();
              toast("Raté !", {
                icon: "📢",
              });
              break;
            default:
              break;
          }
        }
        break;
      case "test":
        // TestSwitch(Row, Column);
        // console.log(Row, Column, Value.type);
        break;
      case "none":
      default:
        break;
    }
  };

  /******************************************************************************/
  /* Function name : PrepareMyShips                                             */
  /* Description : Verify is the ship can be placed with this Tile as reference */
  /* Other functions called : setShipPosition (ShipContext)                     */
  /******************************************************************************/
  const PrepareMyShips = (Row, Column) => {
    //This Tile is a border
    if (Row < 1 || Column < 1) {
      toast.error("Impossible de placer un navire sur une bordure");
      return;
    }
    //This tile is too close of a border
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
    //If there is a ship on the path
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

    if (myShips[preparedIndex].rotated) {
      for (let i = 0; i < myShips[preparedIndex].Tiles; i++) {
        if (myBattleMap[Row + i][Column].type === "ship") {
          const found = OldShipPosition.find(
            (pos) => pos[0] === Row + i && pos[1] === Column
          );
          if (!found) {
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
          if (!found) {
            ThereIsAShip = true;
          }
        }
      }
    }
    if (ThereIsAShip) {
      toast.error("Un navire est dans le chemin");
      return;
    }

    //Validate the ship position
    setShipPosition(preparedIndex, Column, Row);
  };

  return (
    <div className={`${style.Tile} f-center ${Pointer} `} onClick={handleClick}>
      <p>{Value.value}</p>
      <div className={`${style.Effect} ${EffectBG} ${Hover}`}></div>
    </div>
  );
}
