import React, { useContext, useEffect, useState } from "react";
import style from "./Battle.module.scss";
import { useParams } from "react-router-dom";
import { SocketContext } from "../../context/SocketContext";
import { UserContext } from "../../context/UserContext";
import { CurrentRoomContext } from "../../context/CurrentRoomContext";
import { getRoom } from "../../apis/room";
import BattleArea from "../../components/BattleArea/BattleArea";

export default function Battle() {
  const { setRoom } = useContext(CurrentRoomContext);
  const { user } = useContext(UserContext);
  const { socket } = useContext(SocketContext);
  const { id } = useParams();
  const [thisRoom, setThisRoom] = useState();
  const [gameStatus, setGameStatus] = useState("null");

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("battle", (message) => {
        console.log("START BATTLE");
        refresh();
      });
    }
  }, [socket]);

  const refresh = async () => {
    const response = await getRoom(id);
    console.log(response);
    setThisRoom(response);
    setRoom(response);
    setGameStatus(response.status);
  };

  return (
    <div className="d-flex flex-column w-100 flex-fill align-items-center p-20">
      {gameStatus === "prepare_battle" ? (
        <>
          <h1>Préparez vous !</h1>
          <br />
          <h2>Sélectionnez une case</h2>
          <BattleArea ForcedMode="selection" />
        </>
      ) : gameStatus === "battle" ? (
        <>Battle is Begin !</>
      ) : (
        <></>
      )}
    </div>
  );
}
