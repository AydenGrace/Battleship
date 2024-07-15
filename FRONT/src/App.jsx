import { useState } from "react";
import BattleArea from "./components/BattleArea/BattleArea";
import ShipProvider from "./providers/ShipProvider";

function App() {
  const [title, setTitle] = useState("Bataille Navale");

  return (
    <>
      <main className="f-center mh-100 flex-column">
        <h1>{title}</h1>
        <ShipProvider>
          <BattleArea />
        </ShipProvider>
      </main>
    </>
  );
}

export default App;
