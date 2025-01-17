import React, { useContext, useEffect, useState } from "react";
import style from "./Account_Informations.module.scss";

import { UserContext } from "../../../../context/UserContext";

export default function Account_Informations() {
  const { user } = useContext(UserContext);
  return (
    <div
      className={`f-center w-100 flex-fill flex-column align-items-center p-8`}
    >
      <div className="card d-flex flex-column">
        <h2 className="mb-20">Informations Personnelles</h2>
        <div className="w-100 d-flex g-10">
          <p>Pseudonyme : </p>
          <p>{user.username}</p>
        </div>
      </div>
    </div>
  );
}
