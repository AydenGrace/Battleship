import React, { useContext, useEffect, useState } from "react";
import style from "./Historic.module.scss";
import { getUserHistory } from "../../../../apis/users";
import { UserContext } from "../../../../context/UserContext";
import History_Item from "./components/History_Item";

export default function Historic() {
  const { user } = useContext(UserContext);
  const [History, setHistory] = useState([]);
  useEffect(() => {
    const getInfos = async () => {
      setHistory(await getUserHistory().history);
    };
    getInfos();
  }, [user]);

  return (
    <div
      className={`d-flex w-100 flex-fill flex-column align-items-center p-8`}
    >
      <h2 className="mb-20">Historique</h2>
      {History &&
        History.map((item, idx) => <History_Item match={item} key={idx} />)}
    </div>
  );
}
