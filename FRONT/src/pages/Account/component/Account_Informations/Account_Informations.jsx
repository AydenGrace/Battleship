import React, { useContext, useEffect, useState } from "react";
import style from "./Account_Informations.module.scss";

import { UserContext } from "../../../../context/UserContext";

export default function Account_Informations() {
  const { user } = useContext(UserContext);
  return (
    <div
      className={`f-center w-100 flex-fill flex-column align-items-center p-8`}
    >
      <h2 className="card">Informations Personnelles</h2>
    </div>
  );
}
