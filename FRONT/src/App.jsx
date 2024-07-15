import { useState } from "react";
import BattleArea from "./components/BattleArea/BattleArea";
import ShipProvider from "./providers/ShipProvider";
import { Outlet } from "react-router-dom";

function App() {
  const [title, setTitle] = useState("Bataille Navale");

  return (
    <>
      <main className="f-center mh-100 flex-fill flex-column w-100">
        <ShipProvider>
          <Outlet />
        </ShipProvider>
      </main>
    </>
  );
}

export default App;
