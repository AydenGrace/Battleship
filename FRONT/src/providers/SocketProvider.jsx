import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { UserContext } from "../context/UserContext";
import io from "socket.io-client";

export default function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user } = useContext(UserContext);
  // console.log(socket);
  useEffect(() => {
    if (!user) {
      setSocket(null);
      return;
    }

    const socket = io("https://battleship-zb1l.onrender.com", { query: { userId: user._id } });
    setSocket(socket);
    socket.on("getOnlineUsers", (users) => {
      setOnlineUsers(users);
    });

    socket.on("newMessage", (message) => {});

    return () => socket.close();
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
}
