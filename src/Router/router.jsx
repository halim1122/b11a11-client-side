import { createBrowserRouter } from "react-router";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../HomeLayout/Home";
import Login from "../Auth/Login";
import AuthLayout from "../Auth/AuthLayout";
import Register from "../Auth/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children:[
     {
          index: true, Component: Home
     },

    ]
  },
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/auth/login",
        element: <Login></Login>
      },
      {
        path: "/auth/register",
        element: <Register></Register>
      }
    ]
  },
]);