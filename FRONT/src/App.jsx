import ShipProvider from "./providers/ShipProvider";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header/Header";
import style from "./App.module.scss";
import UserProvider from "./providers/UserProvider";
import AllUsersProvider from "./providers/AllUsersProvider";
import MessagesProvider from "./providers/MessagesProvider";
import SocketProvider from "./providers/SocketProvider";
import MessageSocketProvider from "./providers/MessageSocketProvider";
import CurrentRoomProvider from "./providers/CurrentRoomProvider";

function App() {
  // const [title, setTitle] = useState("Bataille Navale");

  return (
    <>
      <div
        className={`d-flex mh-100 flex-fill flex-column w-100 relative ${style.page}`}
      >
        <UserProvider>
          <AllUsersProvider>
            <MessagesProvider>
              <SocketProvider>
                <MessageSocketProvider>
                  <CurrentRoomProvider>
                    <Header />
                    <div className="headerSep"></div>

                    <ShipProvider>
                      <main className="f-center flex-fill flex-column w-100">
                        <Outlet />
                      </main>
                    </ShipProvider>

                    <Toaster position="bottom-right" reverseOrder={false} />
                  </CurrentRoomProvider>
                </MessageSocketProvider>
              </SocketProvider>
            </MessagesProvider>
          </AllUsersProvider>
        </UserProvider>
      </div>
    </>
  );
}

export default App;
