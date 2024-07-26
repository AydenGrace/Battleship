import React, { useContext, useEffect, useState } from "react";
import style from "./History_Item.module.scss";
import { UserContext } from "../../../../../context/UserContext";
import { Link } from "react-router-dom";

export default function History_Item({ match }) {
  const [winner, setWinner] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    switch (match.status) {
      case "finish":
        FinishSetup();
        break;
      case "give_up":
        break;
      case "battle":
        break;
      case "prepare":
        break;
      default:
        break;
    }
  }, [match, user]);

  const FinishSetup = () => {
    let idx;
    if (match.current_turn) idx = 0;
    else idx = 1;
    if (match.maps[idx].user === user._id) setWinner(true);
    else setWinner(false);
  };

  return (
    <div
      className={`d-flex w-100 align-items-center justify-content-sb ${style.container}`}
    >
      {match.status === "finish" ? (
        winner ? (
          <h3 className={`${style.status} ${style.green}`}>Victoire</h3>
        ) : (
          <h3 className={`${style.status} ${style.red}`}>Défaite</h3>
        )
      ) : match.status === "battle" ? (
        <h3 className={`${style.status} ${style.orange}`}>Bataille en cours</h3>
      ) : match.status === "give_up" ? (
        <h3 className={`${style.status} ${style.red}`}>Abandon</h3>
      ) : (
        <h3 className={`${style.status} ${style.orange}`}>Préparation</h3>
      )}
      History_Item
      {match.status === "pending" ? (
        <Link to={`/room/${match._id}`}>Salle</Link>
      ) : (
        <Link to={`/battle/${match._id}`}>Salle</Link>
      )}
    </div>
  );
}
