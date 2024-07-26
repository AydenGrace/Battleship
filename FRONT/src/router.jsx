import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Homepage from "./pages/Homepage/Homepage";
import Battle from "./pages/Battle/Battle";
import RoomTest from "./pages/RoomTest/RoomTest";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Logout from "./pages/Logout/Logout";
import Room from "./pages/Room/Room";
import UserNotConnected from "./components/ProtectedRoutes/UserNotConnected";
import UserConnected from "./components/ProtectedRoutes/UserConnected";
import Privacy from "./pages/Privacy/Privacy";
import Account from "./pages/Account/Account";
import Historic from "./pages/Account/component/Historic/Historic";
import Account_Informations from "./pages/Account/component/Account_Informations/Account_Informations";

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
        path: "/battle/:id",
        element: <Battle />,
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
        element: <Room />,
      },
      {
        path: "/privacy",
        element: <Privacy />,
      },

      {
        path: "/account",
        element: (
          <UserConnected>
            <Account />
          </UserConnected>
        ),
        children: [
          {
            index: true,
            element: <Account_Informations />,
          },
          {
            path: "/history",
            element: <Historic />,
          },
        ],
      },
    ],
  },
]);
