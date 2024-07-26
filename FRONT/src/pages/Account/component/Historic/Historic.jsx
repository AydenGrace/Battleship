import React, { useContext, useEffect } from "react";
import style from "./Historic.module.scss";
import { getUserHistory } from "../../../../apis/users";
import { UserContext } from "../../../../context/UserContext";

export default function Historic() {
  const { user } = useContext(UserContext);
  useEffect(() => {
    const getInfos = async () => {
      console.log(await getUserHistory());
    };
    getInfos();
  }, [user]);

  return (
    <div
      className={`d-flex w-100 flex-fill flex-column align-items-center p-8`}
    >
      <h2 className="mb-20">Historique</h2>
    </div>
  );
}
