import { useContext, useEffect } from "react";
import { MessageSocketContext } from "../context/MessageSocketContext";
import { SocketContext } from "../context/SocketContext";
import { MessagesContext } from "../context/MessagesContext";
import notificationSound from "../assets/sounds/notification.mp3";

export default function MessageSocketProvider({ children }) {
  const { socket } = useContext(SocketContext);
  const { addMessage } = useContext(MessagesContext);

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      const sound = new Audio(notificationSound);
      sound.play();
      addMessage(newMessage);
    };

    if (socket) socket.on("newMessage", handleNewMessage);
    return () => {
      if (socket) socket.off("newMessage", handleNewMessage);
    };
  }, [socket, addMessage]);
  return (
    <MessageSocketContext.Provider value={{}}>
      {children}
    </MessageSocketContext.Provider>
  );
}
