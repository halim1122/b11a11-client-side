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
import Loading from "../Auth/Loading";
import Update from "../components/Update";
import ViewAssignment from "../components/ViewAssignment";

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
        loader: () => fetch(`${import.meta.env.VITE_API}/assignments`),
        hydrateFallbackElement: <Loading></Loading>,
        Component: Assignments
      },
      {
        path:'assignment/update/:id',
        loader: ({params}) =>  fetch(`http://localhost:3000/assignment/${params.id}`),
        hydrateFallbackElement: <Loading></Loading>,
        Component: Update
        
      },
      {
        path:'assignment/:id',
        loader: ({params}) =>  fetch(`http://localhost:3000/assignment/${params.id}`),
        hydrateFallbackElement: <Loading></Loading>,
        Component: ViewAssignment
        
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