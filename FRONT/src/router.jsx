import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Homepage from "./pages/Homepage/Homepage";
import Prepare from "./pages/Prepare/Prepare";
import Battle from "./pages/Battle/Battle";

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
        index: "/prepare",
        element: <Prepare />,
      },
      {
        index: "/battle",
        element: <Battle />,
      },
    ],
  },
]);
