import React from "react";
import style from "./Account.module.scss";
import { Link } from "react-router-dom";

export default function Account() {
  return (
    <div className="w-100 d-flex">
      <div className={` d-flex flex-column ${style.NavColumn}`}>
        <h1>Mon Compte</h1>
        <Link className="btn btn-primary" to={"/logout"}>
          Déconnexion
        </Link>
      </div>
    </div>
  );
}
