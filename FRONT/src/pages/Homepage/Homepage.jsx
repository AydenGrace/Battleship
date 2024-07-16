import React, { useContext } from "react";
import style from "./Homepage.module.scss";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";
import { createRoom } from "../../apis/room";
import { CurrentRoomContext } from "../../context/CurrentRoomContext";
import { Navigate } from "react-router-dom";

export default function Homepage() {
  const { user } = useContext(UserContext);
  const { setRoom } = useContext(CurrentRoomContext);

  const CreateRoom = async () => {
    if (!user) {
      toast.error("Vous devez être connecté pour jouer");
      return;
    }

    const response = await createRoom(user._id);
    // console.log(response);
    if (response.code) {
      setRoom(response);
      window.location.href = `/room/${response._id}`;
    } else toast.error(response.message);
  };

  const JoinRoom = () => {
    if (!user) {
      toast.error("Vous devez être connecté pour jouer");
      return;
    }
  };

  return (
    <div className={`f-center flex-fill flex-column w-100`}>
      <h1>Accueil</h1>
      <div className={`card f-center flex-column`}>
        <button className="btn btn-primary" onClick={CreateRoom}>
          Créer une salle
        </button>
        <p>---- OU ----</p>
        <p>Rejoindre une salle</p>
        <div className="relative">
          <input
            type="text"
            id="code"
            name="code"
            placeholder="Code de la salle"
            className="input"
          />
          <div
            className={`${style.validate} btn btn-primary`}
            onClick={JoinRoom}
          >
            <i className="fa-solid fa-circle-chevron-right fa-xl"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
