import React, { useContext, useEffect, useState } from "react";
import style from "./Ship.module.scss";
import { ShipContext } from "../../context/ShipContext";

export default function Ship({ id, nbTiles, TileSize, isRotated, X, Y }) {
  const { setSelectedShip, mode } = useContext(ShipContext);
  const [transform, setTransform] = useState("");
  const [SavedTileSize, setSavedTileSize] = useState(TileSize);
  const [Pointer, setPointer] = useState("");
  const [Zindex, setZindex] = useState(3);

  const handleWindowResize = (event) => {
    if (window.outerWidth > 577) setSavedTileSize(50);
    else setSavedTileSize(25);
  };
  useEffect(() => {
    switch (mode) {
      case "selection":
        setZindex(3);
        setPointer("pointer");
        break;
      case "test":
      case "battle":
      case "none":
      default:
        setZindex(1);
        setPointer("");
        break;
    }
  }, [mode]);

  useEffect(() => {
    if (isRotated) {
      switch (nbTiles) {
        case 2:
          setTransform(`translateX(-25%) translateY(50%) rotate(90deg)`);
          break;
        case 3:
          setTransform(`translateX(-33%) translateY(100%) rotate(90deg)`);
          break;
        case 4:
          setTransform(`translateX(-38%) translateY(150%) rotate(90deg)`);
          break;
        case 5:
        default:
          setTransform(`translateX(-40%) translateY(200%) rotate(90deg)`);
          break;
      }
    }
  }, []);

  useEffect(() => {
    // console.log(window.innerWidth);
    if (window.outerWidth > 577) setSavedTileSize(50);
    else setSavedTileSize(25);
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [handleWindowResize]);

  const handleClick = (e) => {
    e.stopPropagation();
    setSelectedShip(id);
    console.log(`Current selected ship : ${id}`);
  };

  return (
    <div
      className={`${style.ship} ship${nbTiles} ${Pointer}`}
      id={`ship_${id}`}
      style={{
        top: `calc(${SavedTileSize}px*${Y})`,
        left: `calc(${SavedTileSize}px*${X})`,
        minHeight: `calc(${SavedTileSize}px*1)`,
        minWidth: `calc(${SavedTileSize}px*${nbTiles})`,
        transform: transform,
        zIndex: Zindex,
      }}
      onClick={(e) => handleClick(e)}
    ></div>
  );
}
