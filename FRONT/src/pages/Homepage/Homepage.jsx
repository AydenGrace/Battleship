import React from "react";
import style from "./Homepage.module.scss";
import BattleArea from "../../components/BattleArea/BattleArea";
import Setup from "../../components/Setup/Setup";

export default function Homepage() {
  return (
    <div className={`${style.page} f-center flex-fill flex-column w-100`}>
      <img
        src="logo.png"
        alt="Logo Bataille Navale"
        width={200}
        className="mb-20"
      />
      <h1>Accueil</h1>
      <div className="d-flex">
        <BattleArea />
        {/* <Setup /> */}
      </div>
    </div>
  );
}
