import React from "react";
import style from "./Account.module.scss";
import { Link, NavLink, Outlet } from "react-router-dom";

export default function Account() {
  const transform = (isReturn) => {
    if (isReturn) {
      document.getElementById("navColumn").style.display = "flex";
    } else {
      document.getElementById("navColumn").style.display = "none";
    }
  };
  return (
    <div className={`w-100 d-flex flex-fill ${style.page}`} id="page">
      <div
        className={` d-flex flex-column flex-fill ${style.NavColumn}`}
        id="navColumn"
      >
        <div className="d-flex flex-column">
          <h1>Mon Compte</h1>
          <Link
            to={"/account"}
            className={`${style.NavBtn} ${style.BtnDesktop}`}
          >
            Informations personnelles
          </Link>
          <Link
            to={"/account/history"}
            className={`${style.NavBtn} ${style.BtnDesktop}`}
          >
            Historique
          </Link>

          <Link
            to={"/account"}
            className={`${style.NavBtn} ${style.BtnMobile}`}
            onClick={() => {
              transform(false);
            }}
          >
            Informations personnelles
          </Link>
          <Link
            to={"/account/history"}
            className={`${style.NavBtn} ${style.BtnMobile}`}
            onClick={() => {
              transform(false);
            }}
          >
            Historique
          </Link>
        </div>

        <Link className="btn btn-primary f-center" to={"/logout"}>
          Déconnexion
        </Link>
      </div>
      <div className="d-flex flex-fill relative">
        <div className={`${style.BtnMobile}`}>
          <i
            className={`fa-solid fa-circle-arrow-left fa-2xl pointer ${style.backBtn}`}
            onClick={() => transform(true)}
          ></i>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
