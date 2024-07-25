import { useContext, useEffect, useState } from "react";
import style from "./Timer.module.scss";
import { ShipContext } from "../../context/ShipContext";

export default function Timer({ seconds }) {
  // initialize timeLeft with the seconds prop
  const [timeLeft, setTimeLeft] = useState(seconds);
  const { timer } = useContext(ShipContext);
  let intervalId;

  useEffect(() => {
    if (!timer) {
      console.log("Timer to false");
      clearInterval(intervalId);
      return;
    }

    // exit early when we reach 0
    if (!timeLeft) {
      console.log("Timeout");
      return;
    }

    // save intervalId to clear the interval when the
    // component re-renders
    intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
      console.log(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft, timer]);

  return (
    <div className={`${style.timerArea}`}>
      <p>{timeLeft}</p>
    </div>
  );
}
