import React, { useContext, useEffect, useState } from "react";
import style from "./BattleArea.module.scss";
import Tile from "./components/Tile/Tile";
import { ShipContext } from "../../context/ShipContext";
import Ship from "../Ship/Ship";
import toast from "react-hot-toast";
import { PreparationsCompleted } from "../../apis/room";
import { CurrentRoomContext } from "../../context/CurrentRoomContext";
import { UserContext } from "../../context/UserContext";

export default function BattleArea({
  ForcedMode,
  ShipPositions,
  isEnemyMap,
  Map,
}) {
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
  const [thisMode, setThisMode] = useState(mode);
  const { room } = useContext(CurrentRoomContext);
  const { user } = useContext(UserContext);
  const [validateText, setValidateText] = useState("Valider la position");
  const [BtnView, setBtnView] = useState(true);
  const [currentShip, setCurrentShip] = useState("ship2");
  const [localShip, setLocalShip] = useState(myShips);
  const [localTiles, setLocalTiles] = useState(myBattleMap);

  useEffect(() => {
    if (Map) setLocalTiles(Map);
    if (ForcedMode) {
      setThisMode(ForcedMode);
    }
    // console.log(ShipPositions);
    if (ShipPositions) {
      setMyShips(ShipPositions);
      setLocalShip(ShipPositions);
    } else {
      setLocalShip(myShips);
    }
  }, [ShipPositions, ForcedMode, Map]);

  useEffect(() => {
    console.log("Ship value changed");
  }, [localShip]);

  const handleRotate = () => {
    let canRotate = false;
    if (localShip[preparedIndex].rotated) {
      //Vertical to Horizontal
      if (
        localShip[preparedIndex].Start[0] +
          localShip[preparedIndex].Tiles -
          1 <=
        10
      ) {
        canRotate = true;
      } else {
        toast.error("Rotation impossible");
      }
    } else {
      //Horizontal to Vertical
      if (
        localShip[preparedIndex].Start[1] +
          localShip[preparedIndex].Tiles -
          1 <=
        10
      ) {
        canRotate = true;
      } else {
        toast.error("Rotation impossible");
      }
    }

    let ThereIsAShip = false;
    //VERIFICATION NAVIRE SUR TRAJECTOIR
    if (!localShip[preparedIndex].rotated) {
      for (let i = 1; i < localShip[preparedIndex].Tiles; i++) {
        // console.log(
        //   myBattleMap[localShip[preparedIndex].Start[1] + i][
        //     localShip[preparedIndex].Start[0]
        //   ]
        // );
        if (
          localTiles[localShip[preparedIndex].Start[1] + i][
            localShip[preparedIndex].Start[0]
          ].type === "ship"
        )
          ThereIsAShip = true;
      }
    } else {
      for (let i = 1; i < localShip[preparedIndex].Tiles; i++) {
        if (
          localTiles[localShip[preparedIndex].Start[1]][
            localShip[preparedIndex].Start[0] + i
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
      let tempsShips = localShip;
      if (tempsShips[preparedIndex].rotated)
        tempsShips[preparedIndex].rotated = !tempsShips[preparedIndex].rotated;
      else tempsShips[preparedIndex].rotated = true;
      setLocalShip([...tempsShips]);
      setMyShips([...tempsShips]);

      return;
    }
  };

  const handleNext = () => {
    if (
      localShip[preparedIndex].Start[0] < 0 ||
      localShip[preparedIndex].Start[1] < 0
    ) {
      toast.error("Veuillez placer le navire");
      return;
    }
    if (preparedIndex >= localShip.length - 1) {
      setValidateText("En attente de l'adversaire...");
      setBtnView(false);
      setMode("none");
      // console.log(room);
      // console.log(user);
      // console.log(myBattleMap);
      setPreparedIndex(0);
      PreparationsCompleted(room._id, user._id, myBattleMap, localShip);
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
      <div className={`d-flex flex-wrap ${style.container}`}>
        {!isEnemyMap &&
          (ShipPositions
            ? ShipPositions.map((ship, idx) => (
                <Ship
                  key={`ship_${idx}`}
                  id={idx}
                  nbTiles={ship.Tiles}
                  TileSize={TileSize}
                  X={ship.Start[0]}
                  Y={ship.Start[1]}
                  isRotated={ship.rotated}
                />
              ))
            : localShip.map((ship, idx) => (
                <Ship
                  key={`ship_${idx}`}
                  id={idx}
                  nbTiles={ship.Tiles}
                  TileSize={TileSize}
                  X={ship.Start[0]}
                  Y={ship.Start[1]}
                  isRotated={ship.rotated}
                />
              )))}
        {localTiles.map((Row, ridx) =>
          Row.map((tile, cidx) => (
            <Tile
              key={`${ridx}_${cidx}`}
              Value={tile}
              Column={cidx}
              Row={ridx}
              Mode={thisMode}
            />
          ))
        )}
      </div>
      <svg>
        <filter id="turbulence" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            id="sea-filter"
            numOctaves="3"
            seed="2"
            baseFrequency="0.02 0.05"
          ></feTurbulence>
          <feDisplacementMap scale="20" in="SourceGraphic"></feDisplacementMap>
          <animate
            xlink:href="#sea-filter"
            attributeName="baseFrequency"
            dur="60s"
            keyTimes="0;0.5;1"
            values="0.02 0.06;0.04 0.08;0.02 0.06"
            repeatCount="indefinite"
          />
        </filter>
      </svg>

      {thisMode === "selection" && (
        <>
          {BtnView && (
            <div
              className={`d-flex justify-content-sb align-items-center w-100 p-10 gap-10 ${style.btnArea}`}
            >
              <div
                className={`${style.ship} ${currentShip}`}
                id="ship_preview"
              ></div>
              <div className="d-flex align-items-center flex-fill gap-10">
                <p>Navire n°{preparedIndex + 1}</p>
                <p>Taille {localShip[preparedIndex].Tiles}</p>
              </div>
            </div>
          )}
          <div
            className={`d-flex justify-content-center align-items-center w-100 p-10 ${style.btnArea}`}
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
      {thisMode === "none" && preparedIndex > 0 && (
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
