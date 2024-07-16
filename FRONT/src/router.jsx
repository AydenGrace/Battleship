import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Homepage from "./pages/Homepage/Homepage";
import Prepare from "./pages/Prepare/Prepare";
import Battle from "./pages/Battle/Battle";
import RoomTest from "./pages/RoomTest/RoomTest";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Logout from "./pages/Logout/Logout";
import Room from "./pages/Room/Room";
import UserNotConnected from "./components/ProtectedRoutes/UserNotConnected";
import UserConnected from "./components/ProtectedRoutes/UserConnected";
import InRoom from "./components/ProtectedRoutes/InRoom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "/prepare",
        element: (
          <UserConnected>
            <Homepage />
          </UserConnected>
        ),
      },
      {
        path: "/battle",
        element: (
          <UserConnected>
            <Homepage />
          </UserConnected>
        ),
      },
      {
        path: "/test",
        element: <RoomTest />,
      },
      {
        path: "/login",
        element: (
          <UserNotConnected>
            <Login />
          </UserNotConnected>
        ),
      },
      {
        path: "/register",
        element: (
          <UserNotConnected>
            <Register />
          </UserNotConnected>
        ),
      },
      {
        path: "/logout",
        element: (
          <UserConnected>
            <Logout />
          </UserConnected>
        ),
      },
      {
        path: "/room/:id",
        element: (
          // <InRoom>
          <Room />
          //</InRoom>
        ),
      },
    ],
  },
]);
