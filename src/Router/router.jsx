import { createBrowserRouter } from "react-router";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../HomeLayout/Home";
import Login from "../Auth/Login";
import AuthLayout from "../Auth/AuthLayout";
import Register from "../Auth/Register";
import Assignments from "../Page/Assignments";
import CreateAssignment from "../Page/CreateAssignment";
import AttemdedAssignments from "../Page/AttemdedAssignments";
import AuthPrivate from "../Provider/AuthPrivate";
import PendingAssignments from "../Page/PendingAssignments ";

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
        element: <AuthPrivate><CreateAssignment></CreateAssignment></AuthPrivate>
      },
      {
        path:'attemded-assignments',
        element: <AuthPrivate><AttemdedAssignments></AttemdedAssignments></AuthPrivate>
      },
      {
        path:'pending-assignments',
        element:<AuthPrivate><PendingAssignments></PendingAssignments></AuthPrivate>
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