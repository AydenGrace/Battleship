import BattleArea from "./components/BattleArea/BattleArea";
import ShipProvider from "./providers/ShipProvider";

function App() {
  return (
    <>
      <main className="f-center mh-100">
        <ShipProvider>
          <BattleArea />
        </ShipProvider>
      </main>
    </>
  );
}

export default App;
