import React from "react";
import style from "./Account.module.scss";
import { Link, NavLink, Outlet } from "react-router-dom";

export default function Account() {
  return (
    <div className="w-100 d-flex flex-fill">
      <div className={` d-flex flex-column flex-fill ${style.NavColumn}`}>
        <div className="d-flex flex-column">
          <h1>Mon Compte</h1>
          <Link to={"/account"} className={`${style.NavBtn}`}>
            Informations personnelles
          </Link>
          <Link to={"/account/history"} className={`${style.NavBtn}`}>
            Historique
          </Link>
        </div>

        <Link className="btn btn-primary f-center" to={"/logout"}>
          Déconnexion
        </Link>
      </div>
      <div className="d-flex flex-fill">
        <Outlet />
      </div>
    </div>
  );
}
