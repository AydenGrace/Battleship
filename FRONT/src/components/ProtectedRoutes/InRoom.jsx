import React, { useContext } from "react";
import { CurrentRoomContext } from "../../context/CurrentRoomContext";

export default function InRoom({ children }) {
  const { room } = useContext(CurrentRoomContext);
  return room ? children : <Navigate to="/" />;
}
