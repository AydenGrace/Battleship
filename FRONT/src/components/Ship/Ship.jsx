import React, { useContext, useEffect, useState } from "react";
import style from "./Ship.module.scss";
import { ShipContext } from "../../context/ShipContext";

export default function Ship({
  id = 0,
  nbTiles = 2,
  TileSize = 50,
  isRotated = false,
  X = 1,
  Y = 1,
}) {
  const [Top, setTop] = useState(1);
  const [Left, setLeft] = useState(1);
  const [display, setDisplay] = useState("block");

  useEffect(() => {}, [TileSize]);

  return (
    <div
      className={`${style.ship} ship${nbTiles}`}
      id={`ship_${id}`}
      style={{
        top: `calc(${TileSize}px*${Y})`,
        left: `calc(${TileSize}px*${X})`,
        minHeight: `calc(${TileSize}px*1)`,
        minWidth: `calc(${TileSize}px*${nbTiles})`,
      }}
    ></div>
  );
}
