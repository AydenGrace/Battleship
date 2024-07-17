import React, { useContext, useEffect, useState } from "react";
import { CurrentRoomContext } from "../../context/CurrentRoomContext";
import { UserContext } from "../../context/UserContext";
import { useParams } from 'react-router-dom';
import { getRoom } from "../../apis/room";
import toast from "react-hot-toast";
import style from './Room.module.scss'

export default function Room() {
  const { setRoom } = useContext(CurrentRoomContext);
  const { user } = useContext(UserContext);
  const {id} = useParams();
  const [thisRoom, setThisRoom] = useState();
  const [enemy, setEnemy] = useState();
  let userInRoom = false;

  useEffect(()=>{
    const getThisRoom = async () => {
      const response = await getRoom(id);
      // console.log('room',response);
      if(response && !response.error){
        // console.log('user',user);
        // while(!user);
        userInRoom = false;
        if(user){
          response.users.map((item,idx)=>{
            // console.log("User in Room Id :",item);
            // console.log("User id",user._id);
            if(user._id.valueOf() === item.valueOf()) userInRoom = true;
          })
          if(!userInRoom) window.location.href = '/';
        }
        setThisRoom(response);
        setRoom(response);
      }
    }
    getThisRoom();
  },[user]);

  const copyCode = () => {
    navigator.clipboard.writeText(thisRoom.code);
    toast.success('Code copié !')
  }


  return <div className="d-flex flex-column w-100 flex-fill align-items-center p-20">{thisRoom && 
    <>
      <h1>Salle d'attente</h1>
      <div className={`input pointer ${style.Code}`}onClick={copyCode}><strong>{thisRoom.code}</strong><i className="fa-solid fa-copy"></i></div>
      <section className={`f-center flex-fill w-100 flex-column ${style.ColInMobile}`}>
        <div className="d-flex align-items-end flex-fill w-100 justify-content-center"><div className={`input ${style.UserCard}`}>{user.username}</div></div>
        <div className="f-center"><strong>VS</strong></div>
        <div className="d-flex align-items-start flex-fill w-100 justify-content-center"><div className={`input ${style.UserCard}`}>{enemy ? enemy.username : "En attente d'adversaire" }</div></div>
        <div className="d-flex align-items-end flex-fill w-100 justify-content-center p-10"><button className={`btn btn-primary ${style.ReadyBtn}`}>Prêt !</button></div>
      </section>
    </>
    }
  </div>;
}
