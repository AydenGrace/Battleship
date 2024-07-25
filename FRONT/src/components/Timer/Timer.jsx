import { useContext, useEffect, useState } from "react";
import style from "./Timer.module.scss";
import { ShipContext } from "../../context/ShipContext";
import { CurrentRoomContext } from "../../context/CurrentRoomContext";
import { Leave } from "../../apis/room";

export default function Timer({ seconds }) {
  // initialize timeLeft with the seconds prop
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [enemyTimeLeft, setEnemyTimeLeft] = useState(seconds + 30);
  const { timer } = useContext(ShipContext);
  const { room } = useContext(CurrentRoomContext);
  let intervalId;
  let enemyIntervalId;

  useEffect(() => {
    if (room.status != "battle") {
      return;
    }
    if (!timer) {
      console.log("Timer to false");
      setTimeLeft(seconds);
      clearInterval(intervalId);

      if (!enemyTimeLeft) {
        console.log("Enemy Timeout");
        Leave(room._id);
        return;
      }

      enemyIntervalId = setInterval(() => {
        setEnemyTimeLeft(enemyTimeLeft - 1);
        console.log("Enemy Timer : ", enemyTimeLeft - 1);
      }, 1000);
      return () => clearInterval(enemyIntervalId);
    } else {
      setEnemyTimeLeft(seconds + 30);
      clearInterval(enemyIntervalId);
    }

    // exit early when we reach 0
    if (!timeLeft) {
      Leave(room._id);
      console.log("Timeout");
      return;
    }

    // save intervalId to clear the interval when the
    // component re-renders
    intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
      console.log("My Timer : ", timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft, enemyTimeLeft, timer, room]);

  return (
    <div className={`${style.timerArea}`}>
      {timer ? <p>{timeLeft}</p> : <i className="fa-solid fa-pause fa-2xl"></i>}
    </div>
  );
}
