import React, { useContext, useEffect, useState } from "react";
import { CurrentRoomContext } from "../../context/CurrentRoomContext";
import { UserContext } from "../../context/UserContext";
import { useParams } from "react-router-dom";
import { getRoom, Ready, Start } from "../../apis/room";
import toast from "react-hot-toast";
import style from "./Room.module.scss";
import { SocketContext } from "../../context/SocketContext";

export default function Room() {
  const { setRoom } = useContext(CurrentRoomContext);
  const { user } = useContext(UserContext);
  const { socket } = useContext(SocketContext);
  const { id } = useParams();
  const [thisRoom, setThisRoom] = useState();
  const [OneReadyBg, setOneReadyBg] = useState("");
  const [TwoReadyBg, setTwoReadyBg] = useState("");
  const [ImReady, setImReady] = useState(false);
  const [canStart, setCanStart] = useState(false);
  const ReadyBg = "bg-g";
  let userInRoom = false;

  /******************************************************************************/
  /* Function name : -                                                          */
  /* Description : get DB room values and refresh hooks when current user is get*/
  /* Other functions called : refresh, getRoom (apis)                           */
  /******************************************************************************/
  useEffect(() => {
    const getThisRoom = async () => {
      const response = await getRoom(id);
      if (response && !response.error) {
        userInRoom = false;
        if (user) {
          response.users.map((item, idx) => {
            if (user._id.valueOf() === item._id.valueOf()) userInRoom = true;
          });
          if (!userInRoom) window.location.href = "/";
        }
        setThisRoom(response);
        setRoom(response);
        response.users.map((user, idx) => {
          if (user.ready) {
            if (idx) setTwoReadyBg("bg-g");
            setOneReadyBg("bg-g");
          } else {
            if (idx) setTwoReadyBg("");
            setOneReadyBg("");
          }
        });
        if (response.users.length) {
          if (response.users[0].ready && response.users[1].ready)
            setCanStart(true);
          else setCanStart(false);
        }
        console.log(response);
      }
    };
    getThisRoom();
  }, [user]);

  /******************************************************************************/
  /* Function name : -                                                          */
  /* Description : Web Sockets listening                                        */
  /* Other functions called : refresh                                           */
  /******************************************************************************/
  useEffect(() => {
    if (socket) {
      socket.on("join", (message) => {
        // console.log(message);
        refresh();
      });
      socket.on("ready", () => {
        refresh();
      });

      socket.on("battle", (message) => {
        console.log("START BATTLE");
        console.log(message);
      });

      socket.on("start", (message) => {
        console.log("START", message);
        window.location.href = `/battle/${id}`;
      });
    }
  }, [socket]);

  /******************************************************************************/
  /* Function name : refresh                                                    */
  /* Description : get DB room informations and refresh hooks                   */
  /* Other functions called : getRoom (apis)                                    */
  /******************************************************************************/
  const refresh = async () => {
    const response = await getRoom(id);
    setThisRoom(response);
    setRoom(response);
    setImReady(false);
    response.users.map((user_, idx) => {
      console.log(`Player ${idx} is ${user_.ready}`);
      if (user_.ready) {
        if (idx) setTwoReadyBg("bg-g");
        else setOneReadyBg("bg-g");
        if (user_._id === user._id) setImReady(true);
      } else {
        if (idx) setTwoReadyBg("");
        else setOneReadyBg("");
      }
    });
    if (!response.users.length) {
      setCanStart(false);
      return;
    }
    if (response.users[0].ready && response.users[1].ready) setCanStart(true);
    else setCanStart(false);
  };

  /******************************************************************************/
  /* Function name : CopyCode                                                   */
  /* Description : Copy the room code in the clipboard                          */
  /* Other functions called : -                                                 */
  /******************************************************************************/
  const copyCode = () => {
    navigator.clipboard.writeText(thisRoom.code);
    toast.success("Code copié !");
  };
  /******************************************************************************/
  /* Function name : HandleClick                                                */
  /* Description : Set the player ready                                         */
  /* Other functions called : Ready (apis)                                      */
  /******************************************************************************/
  const handleClick = () => {
    Ready(thisRoom.code, user._id);
  };

  /******************************************************************************/
  /* Function name : HandleStart                                                */
  /* Description : Event when start the battle                                  */
  /* Other functions called : Start (apis)                                      */
  /******************************************************************************/
  const handleStart = () => {
    Start(thisRoom.code, user._id);
  };

  return (
    <div className="d-flex flex-column w-100 flex-fill align-items-center p-20">
      {thisRoom && (
        <>
          <h1>Salle d'attente</h1>

          <div className={`input pointer ${style.Code}`} onClick={copyCode}>
            <strong>{thisRoom.code}</strong>
            <i className="fa-solid fa-copy"></i>
          </div>
          <section
            className={`f-center flex-fill w-100 flex-column ${style.ColInMobile}`}
          >
            <div className="d-flex align-items-end flex-fill w-100 justify-content-center">
              <div className={`input ${style.UserCard} ${OneReadyBg}`}>
                {thisRoom.users[0]
                  ? thisRoom.users[0].username
                  : "En attente d'adversaire"}
              </div>
            </div>
            <div className="f-center">
              <strong>VS</strong>
            </div>
            <div className="d-flex align-items-start flex-fill w-100 justify-content-center">
              <div className={`input ${style.UserCard} ${TwoReadyBg}`}>
                {thisRoom.users[1]
                  ? thisRoom.users[1].username
                  : "En attente d'adversaire"}
              </div>
            </div>
            <div className="d-flex align-items-end flex-fill w-100 justify-content-center p-10">
              {canStart ? (
                <button
                  className={`btn btn-primary ${style.ReadyBtn} bg-g border-g`}
                  onClick={handleStart}
                >
                  Démarrer la partie !
                </button>
              ) : ImReady ? (
                <button
                  className={`btn btn-primary bg-r ${style.ReadyBtn}`}
                  onClick={handleClick}
                >
                  Annuler
                </button>
              ) : (
                <button
                  className={`btn btn-primary ${style.ReadyBtn}`}
                  onClick={handleClick}
                >
                  Prêt !
                </button>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
