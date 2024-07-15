import React, { useContext, useEffect, useState } from "react";
import style from "./BattleArea.module.scss";
import Tile from "./components/Tile/Tile";
import { ShipContext } from "../../context/ShipContext";
import Ship from "../Ship/Ship";

export default function BattleArea() {
  const { myBattleMap, SettingShips } = useContext(ShipContext);
  const [TileSize, setTileSize] = useState(50);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    ResetShips();
  }, []);
  useEffect(() => {
    SettingShips(idx);
    ShowShip();
  }, [idx]);

  const handleWindowResize = (event) => {
    if (window.innerWidth > 577) setTileSize(50);
    else setTileSize(25);
  };

  useEffect(() => {
    // console.log(window.innerWidth);
    if (window.innerWidth > 577) setTileSize(50);
    else setTileSize(25);
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [handleWindowResize]);

  const ResetShips = () => {
    for (let i = 0; i < 5; i++)
      document.getElementById(`ship_${i}`).style.display = "none";
  };

  const ShowShip = () => {
    if (idx > 5 || idx === 0) return;
    document.getElementById(`ship_${idx - 1}`).style.display = "block";
  };

  return (
    <section className={`${style.BattleArea}`}>
      <Ship id={0} nbTiles={2} TileSize={TileSize} />
      <Ship id={1} nbTiles={3} TileSize={TileSize} Y={2} />
      <Ship id={2} nbTiles={3} TileSize={TileSize} Y={3} />
      <Ship id={3} nbTiles={4} TileSize={TileSize} Y={4} />
      <Ship id={4} nbTiles={5} TileSize={TileSize} Y={5} />
      {/* <div
        className={`${style.ship2}`}
        id="ship_0"
        style={{
          top: `calc(${TileSize}px*1)`,
          left: `calc(${TileSize}px*1)`,
          minWidth: `calc(${TileSize}px*2)`,
          minHeight: `calc(${TileSize}px*1)`,
        }}
      ></div>
      <div
        className={`${style.ship3}`}
        id="ship_1"
        style={{
          top: `calc(${TileSize}px*2)`,
          left: `calc(${TileSize}px*1)`,
          minWidth: `calc(${TileSize}px*3)`,
          minHeight: `calc(${TileSize}px*1)`,
        }}
      ></div>
      <div
        className={`${style.ship3}`}
        id="ship_2"
        style={{
          top: `calc(${TileSize}px*3)`,
          left: `calc(${TileSize}px*1)`,
          minWidth: `calc(${TileSize}px*3)`,
          minHeight: `calc(${TileSize}px*1)`,
        }}
      ></div>
      <div
        className={`${style.ship4}`}
        id="ship_3"
        style={{
          top: `calc(${TileSize}px*4)`,
          left: `calc(${TileSize}px*1)`,
          minWidth: `calc(${TileSize}px*4)`,
          minHeight: `calc(${TileSize}px*1)`,
        }}
      ></div>
      <div
        className={`${style.ship5} ${style.rotated}`}
        id="ship_4"
        style={{
          top: `calc(${TileSize}px*5)`,
          left: `calc(${TileSize}px*1)`,
          minWidth: `calc(${TileSize}px*5)`,
          minHeight: `calc(${TileSize}px*1)`,
        }}
      ></div> */}
      {myBattleMap.map((Row, ridx) =>
        Row.map((tile, cidx) => (
          <Tile key={`${ridx}_${cidx}`} Value={tile} Column={cidx} Row={ridx} />
        ))
      )}
      <button
        onClick={() => {
          setIdx(idx + 1);
        }}
      >
        Next Ship
      </button>
    </section>
  );
}
