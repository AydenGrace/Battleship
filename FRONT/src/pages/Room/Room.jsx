import React, { useContext } from "react";
import { CurrentRoomContext } from "../../context/CurrentRoomContext";

export default function Room() {
  const { room } = useContext(CurrentRoomContext);
  console.log(room);
  return <div>Room</div>;
}
