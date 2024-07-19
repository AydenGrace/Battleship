import React, { useContext, useEffect, useState } from "react";
import style from "./Battle.module.scss";
import { useParams } from "react-router-dom";
import { SocketContext } from "../../context/SocketContext";
import { UserContext } from "../../context/UserContext";
import { CurrentRoomContext } from "../../context/CurrentRoomContext";
import { getRoom } from "../../apis/room";
import BattleArea from "../../components/BattleArea/BattleArea";

export default function Battle() {
  const { room, setRoom } = useContext(CurrentRoomContext);
  const { user } = useContext(UserContext);
  const { socket } = useContext(SocketContext);
  const { id } = useParams();
  const [thisRoom, setThisRoom] = useState();
  const [gameStatus, setGameStatus] = useState("null");
  const [MyBattleMapShip, setMyBattleMapShips] = useState(null);
  const [myTurn, setMyTurn] = useState(false);
  const [EnemyMapMode, setEnemyMapMode] = useState("none");

  useEffect(() => {
    refresh();
  }, [user]);

  useEffect(() => {
    if (socket) {
      socket.on("battle", (message) => {
        console.log("START BATTLE");
        console.log(message);
        setThisRoom(message);
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
    let idx;
    if (user) {
      if (response.maps[0].user === user._id) idx = 0;
      else if (response.maps[1].user === user._id) idx = 1;
      else idx = -1;
      if (idx > -1) {
        setMyBattleMapShips(response.maps[idx].ships);
        if (idx === response.current_turn) {
          setMyTurn(true);
          setEnemyMapMode("battle");
        } else {
          setMyTurn(false);
          setEnemyMapMode("none");
        }
      }

      // console.log(idx);
    }
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
        <>
          {myTurn ? <h1>Votre Tour</h1> : <h1>Tour de l'adversaire</h1>}

          <div className="f-center flex-wrap">
            <div className={`${style.MyBattleMap}`}>
              <BattleArea ForcedMode="none" ShipPositions={MyBattleMapShip} />
            </div>
            <BattleArea ForcedMode={EnemyMapMode} />
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
