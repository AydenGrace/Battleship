import { useEffect, useRef, useState } from "react";
import { ShipContext } from "../context/ShipContext";

export default function ShipProvider({ children }) {
  const [preparedIndex, setPreparedIndex] = useState(0);
  const NbMaxSecOfATurn = 60;
  let [timer, setTimer] = useState(0);
  let [currentTime, setCurrentTime] = useState();
  const [time, setTime] = useState();
  const currentTimer = useRef();

  const startTimer = () => {
    currentTimer.current = setInterval(() => {
      setTime((prev) => prev + 1);
      console.log(time);
    }, 1000);
  };

  const resetTimer = () => {
    clearInterval(currentTimer.current);
    setTime(0);
  };

  /******************************************************************************/
  /* Function name : launchTimer                                                */
  /* Description : Set Timeout for a turn                                       */
  /* Other functions called : -                                                 */
  /******************************************************************************/
  const launchTimer = () => {
    console.log("Timer set");
    // let localTimer = NbMaxSecOfATurn;
    // setCurrentTime(NbMaxSecOfATurn);
    // timer =
    // setTimeout(() => {
    //   console.log("TIMEOUT");
    // }, NbMaxSecOfATurn * 1000)
    setTime(() => NbMaxSecOfATurn);

    currentTimer.current = setInterval(() => {
      setTime((prev) => prev - 1);
      console.log(time);
      if (time <= 0) {
        console.log("Timeout");
        stopTimer();
      }
    }, 1000);
  };

  /******************************************************************************/
  /* Function name : stopTimer                                                */
  /* Description : Stop Timer if launched                                       */
  /* Other functions called : -                                                 */
  /******************************************************************************/
  const stopTimer = () => {
    console.log("Timer Stop");
    clearInterval(currentTimer.current);
    setTime((prev) => NbMaxSecOfATurn);
  };

  /******************************************************************************/
  /* Function name : reset                                                      */
  /* Description : Reset all values by default                                  */
  /* Other functions called : -                                                 */
  /******************************************************************************/
  const Reset = () => {
    setMyShips([
      { Tiles: 2, Start: [-1, -1], Life: 2, rotated: false },
      { Tiles: 3, Start: [-1, -1], Life: 3, rotated: false },
      { Tiles: 3, Start: [-1, -1], Life: 3, rotated: false },
      { Tiles: 4, Start: [-1, -1], Life: 4, rotated: false },
      { Tiles: 5, Start: [-1, -1], Life: 5, rotated: false },
    ]);
    setEnemyShips([
      { Tiles: 2, Start: [-1, -1], Life: 2, rotated: false },
      { Tiles: 3, Start: [-1, -1], Life: 3, rotated: false },
      { Tiles: 3, Start: [-1, -1], Life: 3, rotated: false },
      { Tiles: 4, Start: [-1, -1], Life: 4, rotated: false },
      { Tiles: 5, Start: [-1, -1], Life: 5, rotated: false },
    ]);
    setMyBattleMap([
      [
        { value: "", type: "border" },
        { value: "A", type: "border" },
        { value: "B", type: "border" },
        { value: "C", type: "border" },
        { value: "D", type: "border" },
        { value: "E", type: "border" },
        { value: "F", type: "border" },
        { value: "G", type: "border" },
        { value: "H", type: "border" },
        { value: "I", type: "border" },
        { value: "J", type: "border" },
      ],
      [
        { value: "1", type: "border" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
      ],
      [
        { value: "2", type: "border" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
      ],
      [
        { value: "3", type: "border" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
      ],
      [
        { value: "4", type: "border" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
      ],
      [
        { value: "5", type: "border" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
      ],
      [
        { value: "6", type: "border" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
      ],
      [
        { value: "7", type: "border" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
      ],
      [
        { value: "8", type: "border" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
      ],
      [
        { value: "9", type: "border" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
      ],
      [
        { value: "10", type: "border" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
      ],
    ]);
    setEnemyBattleMap([
      [
        { value: "", type: "border" },
        { value: "A", type: "border" },
        { value: "B", type: "border" },
        { value: "C", type: "border" },
        { value: "D", type: "border" },
        { value: "E", type: "border" },
        { value: "F", type: "border" },
        { value: "G", type: "border" },
        { value: "H", type: "border" },
        { value: "I", type: "border" },
        { value: "J", type: "border" },
      ],
      [
        { value: "1", type: "border" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
      ],
      [
        { value: "2", type: "border" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
      ],
      [
        { value: "3", type: "border" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
      ],
      [
        { value: "4", type: "border" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
      ],
      [
        { value: "5", type: "border" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
      ],
      [
        { value: "6", type: "border" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
      ],
      [
        { value: "7", type: "border" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
      ],
      [
        { value: "8", type: "border" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
      ],
      [
        { value: "9", type: "border" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
      ],
      [
        { value: "10", type: "border" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
        { value: "", type: "sea" },
      ],
    ]);
    setMode("none");
  };

  const [selectedShip, setSelectedShip] = useState(-1);
  const [myShips, setMyShips] = useState([
    { Tiles: 2, Start: [-1, -1], Life: 2, rotated: false },
    { Tiles: 3, Start: [-1, -1], Life: 3, rotated: false },
    { Tiles: 3, Start: [-1, -1], Life: 3, rotated: false },
    { Tiles: 4, Start: [-1, -1], Life: 4, rotated: false },
    { Tiles: 5, Start: [-1, -1], Life: 5, rotated: false },
  ]);

  const [myBattleMap, setMyBattleMap] = useState([
    [
      { value: "", type: "border", shipIDX: -1 },
      { value: "A", type: "border", shipIDX: -1 },
      { value: "B", type: "border", shipIDX: -1 },
      { value: "C", type: "border", shipIDX: -1 },
      { value: "D", type: "border", shipIDX: -1 },
      { value: "E", type: "border", shipIDX: -1 },
      { value: "F", type: "border", shipIDX: -1 },
      { value: "G", type: "border", shipIDX: -1 },
      { value: "H", type: "border", shipIDX: -1 },
      { value: "I", type: "border", shipIDX: -1 },
      { value: "J", type: "border", shipIDX: -1 },
    ],
    [
      { value: "1", type: "border", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
    ],
    [
      { value: "2", type: "border", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
    ],
    [
      { value: "3", type: "border", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
    ],
    [
      { value: "4", type: "border", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
    ],
    [
      { value: "5", type: "border", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
    ],
    [
      { value: "6", type: "border", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
    ],
    [
      { value: "7", type: "border", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
    ],
    [
      { value: "8", type: "border", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
    ],
    [
      { value: "9", type: "border", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
    ],
    [
      { value: "10", type: "border", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
    ],
  ]);

  const [enemyBattleMap, setEnemyBattleMap] = useState([
    [
      { value: "", type: "border", shipIDX: -1 },
      { value: "A", type: "border", shipIDX: -1 },
      { value: "B", type: "border", shipIDX: -1 },
      { value: "C", type: "border", shipIDX: -1 },
      { value: "D", type: "border", shipIDX: -1 },
      { value: "E", type: "border", shipIDX: -1 },
      { value: "F", type: "border", shipIDX: -1 },
      { value: "G", type: "border", shipIDX: -1 },
      { value: "H", type: "border", shipIDX: -1 },
      { value: "I", type: "border", shipIDX: -1 },
      { value: "J", type: "border", shipIDX: -1 },
    ],
    [
      { value: "1", type: "border", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
    ],
    [
      { value: "2", type: "border", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
    ],
    [
      { value: "3", type: "border", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
    ],
    [
      { value: "4", type: "border", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
    ],
    [
      { value: "5", type: "border", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
    ],
    [
      { value: "6", type: "border", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
    ],
    [
      { value: "7", type: "border", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
    ],
    [
      { value: "8", type: "border", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
    ],
    [
      { value: "9", type: "border", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
    ],
    [
      { value: "10", type: "border", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
      { value: "", type: "sea", shipIDX: -1 },
    ],
  ]);

  const [enemyShips, setEnemyShips] = useState([
    { Tiles: 2, Start: [1, 1], Life: 2, rotated: false },
    { Tiles: 3, Start: [1, 2], Life: 3, rotated: false },
    { Tiles: 3, Start: [1, 3], Life: 3, rotated: false },
    { Tiles: 4, Start: [1, 4], Life: 4, rotated: false },
    { Tiles: 5, Start: [1, 5], Life: 5, rotated: false },
  ]);

  const [mode, setMode] = useState("none");

  const SettingShips = async (idxShip) => {
    console.log(myShips.length, idxShip);
    if (idxShip >= myShips.length) {
      setMode("none");
      return;
    }
    setMode("selection");

    console.log(`Placez votre navire de taille ${myShips[idxShip].Tiles}`);
  };

  /******************************************************************************/
  /* Function name : ShipOnBattlefield                                          */
  /* Description : set Tiles values depending of the ships positions            */
  /* Other functions called : getRoom (apis)                                    */
  /******************************************************************************/
  const ShipOnBattlefield = async () => {
    //Change value of the Tiles when a ship is set

    //RESET
    myShips.map((ship, idx) => {
      myBattleMap.map((row, ridx) => {
        row.map((tile, cidx) => {
          if (cidx === 0 || ridx === 0) tile.type = "border";
          else tile.type = "sea";
        });
      });
    });
    //SEARCH SHIPS
    myShips.map((ship, idx) => {
      if (ship.Start[0] > 0 && ship.Start[1] > 0) {
        myBattleMap.map((row, ridx) => {
          if (ridx === ship.Start[1]) {
            //Find Row
            row.map((tile, cidx) => {
              if (cidx === ship.Start[0]) {
                //Starting Point Found
                if (ship.rotated) {
                  for (let i = 0; i < ship.Tiles; i++) {
                    if (ridx + i < 11) {
                      myBattleMap[ridx + i][cidx].type = "ship";
                      myBattleMap[ridx + i][cidx].shipIDX = idx;
                    }
                  }
                } else {
                  //Is horinzontaly (X)
                  for (let i = 0; i < ship.Tiles; i++) {
                    if (cidx + i < 11) {
                      myBattleMap[ridx][cidx + i].type = "ship";
                      myBattleMap[ridx][cidx + i].shipIDX = idx;
                    }
                  }
                }
              }
            });
          }
        });
      }
    });
    setMyBattleMap([...myBattleMap]);
  };

  const setShipPosition = (shipIdx, Row, Column) => {
    let temp = [...myShips];
    temp[shipIdx].Start = [Row, Column];
    setMyShips([...temp]);
  };

  /******************************************************************************/
  /* Function name : TestSwitch                                                 */
  /* Description : Function of testing to change Tiles values                   */
  /* Other functions called : -                                                 */
  /******************************************************************************/
  const TestSwitch = (row, column) => {
    let tempBattleMap = [...myBattleMap];
    tempBattleMap.map((Row, ridx) => {
      if (ridx === row) {
        Row.map((Column, cidx) => {
          if (cidx === column) {
            switch (Column.type) {
              case "sea":
                Column.type = "miss";
                break;

              case "miss":
                Column.type = "destroyed";
                break;
              case "destroyed":
                Column.type = "sea";
                break;
              case "ship":
              case "border":
              default:
                break;
            }
          }
        });
      }
    });
    setMyBattleMap([...tempBattleMap]);
  };

  useEffect(() => {
    ShipOnBattlefield();
  }, [myShips]);

  return (
    <ShipContext.Provider
      value={{
        myShips,
        setMyShips,
        enemyShips,
        mode,
        setMode,
        myBattleMap,
        TestSwitch,
        preparedIndex,
        setPreparedIndex,
        SettingShips,
        setSelectedShip,
        selectedShip,
        Reset,
        setShipPosition,
        launchTimer,
        stopTimer,
      }}
    >
      {children}
    </ShipContext.Provider>
  );
}
