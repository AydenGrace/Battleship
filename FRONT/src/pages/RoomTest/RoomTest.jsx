import React from "react";
import style from "./RoomTest.module.scss";
import BattleArea from "../../components/BattleArea/BattleArea";
import Setup from "../../components/Setup/Setup";

export default function RoomTest() {
  return (
    <div className={` f-center flex-fill flex-column w-100`}>
      <h1>Salle de Test</h1>
      <div className="d-flex">
        <BattleArea />
        {/* <Setup /> */}
      </div>
    </div>
  );
}
