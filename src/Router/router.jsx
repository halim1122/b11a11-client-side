
import { createBrowserRouter } from "react-router";
import AuthPrivate from "../Provider/AuthPrivate";
import ViewAssignment from "../components/ViewAssignment";
import PendingAssignments from "../Page/PendingAssignments ";
import Loading from "../Auth/Loading";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../HomeLayout/Home";
import Assignments from "../Page/Assignments";
import Update from "../components/Update";
import CreateAssignment from "../Page/CreateAssignment";
import AttemdedAssignments from "../Page/AttemdedAssignments";
import AuthLayout from "../Auth/AuthLayout";
import Register from "../Auth/Register";
import Login from "../Auth/Login";



export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'assignments',
        loader: () => fetch(`${import.meta.env.VITE_API}/assignments`, {
          credentials: 'include'
        }),
        hydrateFallbackElement: <Loading />,
        Component: Assignments
      },
      {
        path: 'assignment/update/:id',
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API}/assignment/${params.id}`),
        hydrateFallbackElement: <Loading />,
        Component: Update
      },
      {
        path: 'assignment/:id',
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API}/assignment/${params.id}`),
        hydrateFallbackElement: <Loading />,
        Component: ViewAssignment
      },
      {
        path: 'create-assignment',
        element: <AuthPrivate><CreateAssignment /></AuthPrivate>
      },
      {
        path: 'attemded-assignments',
        element: <AuthPrivate><AttemdedAssignments /></AuthPrivate>
      },
      {
        path: 'pending-assignments',
        element: <AuthPrivate><PendingAssignments /></AuthPrivate>
      }
    ]
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/login",
        element: <Login />
      },
      {
        path: "/auth/register",
        element: <Register />
      }
    ]
  }
]);
