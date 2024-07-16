import React, { useContext } from "react";
import style from "./Header.module.scss";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
export default function Header() {
  const { user } = useContext(UserContext);
  //   console.log(user?.username);
  return (
    <header
      className={`d-flex justify-content-sb align-items-center ${style.container}`}
    >
      <Link to={"/"} className="d-flex align-items-center">
        <img src="logo.png" alt="" />
        <p>Bataille Navale</p>
      </Link>
      {!user ? (
        <Link to={"/login"} className="btn btn-primary">
          Connexion
        </Link>
      ) : (
        <Link to={"/logout"} className="btn btn-primary">
          Déconnexion
        </Link>
      )}
    </header>
  );
}
