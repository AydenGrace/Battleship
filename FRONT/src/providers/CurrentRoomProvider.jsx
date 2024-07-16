import { useEffect, useState } from "react";
import { CurrentRoomContext } from "../context/CurrentRoomContext";

export default function CurrentRoomProvider({ children }) {
  const [room, setRoom] = useState("aaa");

  function setCurrentRoom(value) {
    setRoom(value);
  }

  return (
    <CurrentRoomContext.Provider value={{ room, setRoom, setCurrentRoom }}>
      {children}
    </CurrentRoomContext.Provider>
  );
}
