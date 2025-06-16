import { createBrowserRouter } from "react-router";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../HomeLayout/Home";
import Login from "../Auth/Login";
import AuthLayout from "../Auth/AuthLayout";
import Register from "../Auth/Register";
import Assignments from "../Page/Assignments";
import CreateAssignment from "../Page/CreateAssignment";
import AttemdedAssignments from "../Page/AttemdedAssignments";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true, Component: Home
      },
      {
        path: 'assignments',
        Component: Assignments
      },
      {
        path: 'create-assignment',
        Component: CreateAssignment
      },
      {
        path:'attemded-assignments',
        Component: AttemdedAssignments
      }

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