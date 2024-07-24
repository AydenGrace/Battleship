import React, { useContext, useEffect, useState } from "react";
import style from "./Ship.module.scss";
import { ShipContext } from "../../context/ShipContext";
import toast from "react-hot-toast";

export default function Ship({ id, nbTiles, TileSize, isRotated, X, Y }) {
  const { setSelectedShip, mode, myShips } = useContext(ShipContext);
  const [transform, setTransform] = useState("");
  const [SavedTileSize, setSavedTileSize] = useState(TileSize);
  const [Pointer, setPointer] = useState("");
  const [Zindex, setZindex] = useState(3);
  const [display, setDisplay] = useState("none");

  /***********************************************************************************/
  /* Function name : handleWindowResize                                              */
  /* Description : Change ship size by the Tile's size Hook                          */
  /* Other functions called : -                                                      */
  /***********************************************************************************/
  const handleWindowResize = (event) => {
    if (window.outerWidth > 577) setSavedTileSize(50);
    else setSavedTileSize(30);
  };

  /***********************************************************************************/
  /* Function name : -                                                               */
  /* Description : Set pointer and ZIndex depending of the current game mode         */
  /* Other functions called : -                                                      */
  /***********************************************************************************/
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

  /***********************************************************************************/
  /* Function name : -                                                               */
  /* Description : set CSS transform text depending of the ship size                 */
  /* Other functions called : -                                                      */
  /***********************************************************************************/
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
          setTransform(`translateX(-37%) translateY(150%) rotate(90deg)`);
          break;
        case 5:
        default:
          setTransform(`translateX(-40%) translateY(200%) rotate(90deg)`);
          break;
      }
    } else setTransform(``);

    if (X > 0 && X < 11 && Y > 0 && Y < 11) setDisplay("block");
    else setDisplay("none");
  }, [myShips, isRotated]);

  /***********************************************************************************/
  /* Function name : -                                                               */
  /* Description : Event Listener on window resize for responsive                    */
  /* Other functions called : -                                                      */
  /***********************************************************************************/
  useEffect(() => {
    // console.log(window.innerWidth);
    if (window.outerWidth > 577) setSavedTileSize(50);
    else setSavedTileSize(30);
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [handleWindowResize]);

  const handleClick = (e) => {
    setSelectedShip(id);
    console.log(`Current selected ship : ${id}`);
    toast.success("Ship selected !");
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
        display: display,
      }}
      onClick={(e) => handleClick(e)}
    ></div>
  );
}
