import React, { useContext, useEffect, useState } from "react";
import style from "./BattleArea.module.scss";
import Tile from "./components/Tile/Tile";
import { ShipContext } from "../../context/ShipContext";
import Ship from "../Ship/Ship";
import toast from "react-hot-toast";
import { PreparationsCompleted } from "../../apis/room";
import { CurrentRoomContext } from "../../context/CurrentRoomContext";
import { UserContext } from "../../context/UserContext";

export default function BattleArea({ ForcedMode }) {
  const {
    myBattleMap,
    setMyShips,
    preparedIndex,
    myShips,
    setMode,
    mode,
    setPreparedIndex,
  } = useContext(ShipContext);
  const [TileSize, setTileSize] = useState(50);
  const [idx, setIdx] = useState(0);
  const [thisMode, setThisMode] = useState(ForcedMode);
  const { room } = useContext(CurrentRoomContext);
  const { user } = useContext(UserContext);
  const [validateText, setValidateText] = useState("Valider la position");
  const [BtnView, setBtnView] = useState(true);
  const [currentShip, setCurrentShip] = useState("ship2");

  useEffect(() => {
    if (ForcedMode) {
      setMode(ForcedMode);
    }
  }, []);

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
    setThisMode(mode);
  };

  const handleRotate = () => {
    let canRotate = false;
    if (myShips[preparedIndex].rotated) {
      //Vertical to Horizontal
      if (
        myShips[preparedIndex].Start[0] + myShips[preparedIndex].Tiles - 1 <=
        10
      ) {
        canRotate = true;
      } else {
        toast.error("Rotation impossible");
      }
    } else {
      //Horizontal to Vertical
      if (
        myShips[preparedIndex].Start[1] + myShips[preparedIndex].Tiles - 1 <=
        10
      ) {
        canRotate = true;
      } else {
        toast.error("Rotation impossible");
      }
    }

    let ThereIsAShip = false;
    //VERIFICATION NAVIRE SUR TRAJECTOIR
    if (!myShips[preparedIndex].rotated) {
      for (let i = 1; i < myShips[preparedIndex].Tiles; i++) {
        console.log(
          myBattleMap[myShips[preparedIndex].Start[1] + i][
            myShips[preparedIndex].Start[0]
          ]
        );
        if (
          myBattleMap[myShips[preparedIndex].Start[1] + i][
            myShips[preparedIndex].Start[0]
          ].type === "ship"
        )
          ThereIsAShip = true;
      }
    } else {
      for (let i = 1; i < myShips[preparedIndex].Tiles; i++) {
        if (
          myBattleMap[myShips[preparedIndex].Start[1]][
            myShips[preparedIndex].Start[0] + i
          ].type === "ship"
        )
          ThereIsAShip = true;
      }
    }
    if (ThereIsAShip) {
      toast.error("Un navire est dans le chemin");
      return;
    }

    //ROTATION
    if (canRotate) {
      let tempsShips = [...myShips];
      if (tempsShips[preparedIndex].rotated)
        tempsShips[preparedIndex].rotated = !tempsShips[preparedIndex].rotated;
      else tempsShips[preparedIndex].rotated = true;
      setMyShips(tempsShips);
      return;
    }
  };

  const handleNext = () => {
    if (
      myShips[preparedIndex].Start[0] < 0 ||
      myShips[preparedIndex].Start[1] < 0
    ) {
      toast.error("Veuillez placer le navire");
      return;
    }
    if (preparedIndex >= myShips.length - 1) {
      setValidateText("En attente de l'adversaire...");
      setBtnView(false);
      setMode("none");
      console.log(room);
      console.log(user);
      console.log(myBattleMap);
      PreparationsCompleted(room._id, user._id, myBattleMap);
    } else {
      setPreparedIndex(preparedIndex + 1);
      switch (preparedIndex + 1) {
        case 1:
        case 2:
          setCurrentShip("ship3");
          document.getElementById("ship_preview").style.width = "75px";
          break;
        case 3:
          setCurrentShip("ship4");
          document.getElementById("ship_preview").style.width = "100px";
          break;
        case 4:
          setCurrentShip("ship5");
          document.getElementById("ship_preview").style.width = "125px";
          break;
        default:
          setCurrentShip("ship2");
          document.getElementById("ship_preview").style.width = "50px";
          break;
      }
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

      {mode === "selection" && (
        <>
          {BtnView && (
            <div
              className={`d-flex justify-content-sb align-items-center w-100 p-10 gap-10 ${style.btnArea}`}
            >
              <div
                className={`${style.ship} ship ${currentShip}`}
                id="ship_preview"
              ></div>
              <div className="d-flex align-items-center flex-fill gap-10">
                <p>Navire n°{preparedIndex + 1}</p>
                <p>Taille {myShips[preparedIndex].Tiles}</p>
              </div>
            </div>
          )}
          <div
            className={`d-flex justify-content-sb align-items-center w-100 p-10 ${style.btnArea}`}
          >
            {BtnView && (
              <button className="btn btn-primary" onClick={handleRotate}>
                Tourner le navire
              </button>
            )}

            <button
              className="btn btn-primary bg-g border-g"
              onClick={handleNext}
            >
              {validateText}
            </button>
          </div>
        </>
      )}
      {mode === "none" && preparedIndex > 0 && (
        <div
          className={`d-flex justify-content-center align-items-center w-100 p-10 ${style.btnArea}`}
        >
          <button
            className="btn btn-primary bg-g border-g"
            onClick={handleNext}
          >
            {validateText}
          </button>
        </div>
      )}
    </section>
  );
}
