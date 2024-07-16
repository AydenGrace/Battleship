import { useEffect, useState } from "react";
import { MessagesContext } from "../context/MessagesContext";

export default function MessagesProvider({ children }) {
  const [allMessages, setAllMessages] = useState([]);

  const addMessage = async (message) => {
    setAllMessages([...allMessages, message]);
  };

  const displayMessages = (data) => {
    setAllMessages(data);
  };

  return (
    <MessagesContext.Provider
      value={{ allMessages, addMessage, displayMessages }}
    >
      {children}
    </MessagesContext.Provider>
  );
}
