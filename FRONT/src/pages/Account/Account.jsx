import React from "react";
import style from "./Account.module.scss";
import { Link, Outlet } from "react-router-dom";

export default function Account() {
  return (
    <div className="w-100 d-flex flex-fill">
      <div className={` d-flex flex-column flex-fill ${style.NavColumn}`}>
        <div className="d-flex flex-column">
          <h1>Mon Compte</h1>
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
