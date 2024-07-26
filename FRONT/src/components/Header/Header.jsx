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
        <img
          src="https://firebasestorage.googleapis.com/v0/b/battleship-65975.appspot.com/o/logo_1.webp?alt=media&token=9939db6f-dc75-4e07-a704-d2183c5096a9"
          alt="Logo"
        />
        <p>Bataille Navale</p>
      </Link>
      {!user ? (
        <Link to={"/login"} className="btn btn-primary">
          Connexion
        </Link>
      ) : (
        <Link to={"/account"} className="btn btn-primary">
          Mon Compte
        </Link>
      )}
    </header>
  );
}
