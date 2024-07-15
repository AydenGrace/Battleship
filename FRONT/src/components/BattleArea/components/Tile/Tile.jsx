import React, { useEffect, useState } from "react";
import style from "./Tile.module.scss";

export default function Tile({ Value, Column, Row }) {
  const [Pointer, setPointer] = useState("");

  useEffect(() => {
    if (Value) return;
    setPointer("pointer");
  }, []);

  const handleClick = () => {
    if (Value) return;
    else console.log(Row, Column);
  };
  return (
    <div className={`${style.Tile} f-center ${Pointer}`} onClick={handleClick}>
      <p>{Value}</p>
    </div>
  );
}
