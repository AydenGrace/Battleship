import React, { useContext } from "react";
import { CurrentRoomContext } from "../../context/CurrentRoomContext";
import { UserContext } from "../../context/UserContext";
import { Navigate } from "react-router-dom";

export default function InRoom({ children }) {
  const { room } = useContext(CurrentRoomContext);
  const { user } = useContext(UserContext);
  console.log(user, room);
  return room && user ? children : <Navigate to="/" />;
}
