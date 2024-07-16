import React, { useContext, useEffect } from "react";
import style from "./Setup.module.scss";
import { ShipContext } from "../../context/ShipContext";

export default function Setup() {
  const { myShips, setMyShips, Reset } = useContext(ShipContext);
  // console.log(myShips);

  useEffect(() => {
    myShips.map((item, idx) => {
      if (item.rotated) document.getElementById(`rotate_${idx}`).checked = true;
    });
  }, []);

  const handleChange = (e, ship, coordinate_changed, isRotated) => {
    let tempsShips = [...myShips];
    if (isRotated) {
      console.log(tempsShips[ship], isRotated);
      if (tempsShips[ship].rotated)
        tempsShips[ship].rotated = !tempsShips[ship].rotated;
      else tempsShips[ship].rotated = true;
      setMyShips(tempsShips);
      return;
    }
    switch (coordinate_changed) {
      case "X":
        tempsShips[ship].Start[0] = Number(e.target.value);
        break;
      default:
        tempsShips[ship].Start[1] = Number(e.target.value);
        break;
    }
    console.log(myShips);
    setMyShips(tempsShips);
  };

  const handleReset = () => {
    Reset();
  };
  return (
    <div className={`d-flex flex-column ${style.area}`}>
      <h2>Réglages</h2>
      {myShips.map((ship, idx) => (
        <div key={idx}>
          <p>{`Bateau n°${idx}`}</p>
          <div
            className="d-flex flex-column"
            style={{
              border: "1px solid white",
              padding: "10px",
              borderRadius: "20px",
            }}
          >
            <div className="d-flex flex-wrap">
              <strong>X: </strong>
              <input
                type="number"
                min={1}
                max={ship.rotated ? 10 : 10 - ship.Tiles + 1}
                placeholder={ship.Start[0]}
                style={{ maxWidth: "40px" }}
                onChange={(e) => handleChange(e, idx, "X", false)}
              />
              <strong>Y: </strong>
              <input
                type="number"
                min={1}
                max={ship.rotated ? 10 - ship.Tiles + 1 : 10}
                placeholder={ship.Start[1]}
                style={{ maxWidth: "40px" }}
                onChange={(e) => handleChange(e, idx, "Y", false)}
              />
              <strong>Rotated :</strong>

              <input
                type="checkbox"
                id={`rotate_${idx}`}
                name="rotate"
                value={true}
                onChange={(e) => handleChange(e, idx, null, true)}
              />
            </div>
          </div>
        </div>
      ))}
      <button onClick={handleReset}>Reset</button>
      <div></div>
    </div>
  );
}
