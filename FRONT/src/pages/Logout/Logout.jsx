import React, { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";

export default function Logout() {
  const { logoutConnectedUser } = useContext(UserContext);
  useEffect(() => {
    console.log("LOGOUT");
    logoutConnectedUser();
  }, []);

  return (
    <div>
      <h2>Déconnexion en cours...</h2>
    </div>
  );
}
