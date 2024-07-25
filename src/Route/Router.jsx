import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Login from "../pages/Form/Login";
import Register from "../pages/Form/Register";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/Dashbord/Dashboard";
import Border from "../pages/Border/Border";
import Bazar from "../pages/Bazar/Bazar";
import Deposite from "../pages/Deposite/Deposite";
import Meal from "../pages/Meal/Meal";
import Summary from "../pages/Summary/Summary";
import Report from "../pages/Report/Report";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Root />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/border",
        element: <Border />,
      },
      {
        path: "bazar",
        element: <Bazar />,
      },
      {
        path: "/deposit",
        element: <Deposite />,
      },
      {
        path: "/meal",
        element: <Meal />,
      },
      {
        path: "/summary",
        element: <Summary />,
      },
      {
        path: "/report",
        element: <Report />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Register />,
  },
]);
export default router;
