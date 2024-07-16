import { useEffect, useState } from "react";
import { AllUsersContext } from "../context/AllUsersContext";
import { getUsers } from "../apis/users";

export default function AllUsersProvider({ children }) {
  const [allUsers, setAllUsers] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    updateAllUsers();
  }, []);

  const updateAllUsers = async () => {
    const users = await getUsers();
    console.log(users);
    setAllUsers(users);
  };

  const selectConversation = (conversation) => {
    setSelectedUser(conversation);
  };

  return (
    <AllUsersContext.Provider
      value={{ allUsers, updateAllUsers, selectConversation, selectedUser }}
    >
      {children}
    </AllUsersContext.Provider>
  );
}
