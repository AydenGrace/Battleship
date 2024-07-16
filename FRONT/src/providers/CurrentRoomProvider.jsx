import { useEffect, useState } from "react";
import { CurrentRoomContext } from "../context/CurrentRoomContext";

export default function CurrentRoomProvider({ children }) {
  const [room, setRoom] = useState(null);

  const setCurrentRoom = (value) => {
    setRoom(value);
  };

  return (
    <CurrentRoomContext.Provider value={(room, setCurrentRoom)}>
      {children}
    </CurrentRoomContext.Provider>
  );
}
