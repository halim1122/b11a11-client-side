
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
import LoadingSpinner from "../components/LoadingSpinner";
import AboutUs from "../components/AboutUs";
import Error from "../Error";
import DashboardLayout from "../MainLayout/DashboardLayout";



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
        loader: () => fetch(`${import.meta.env.VITE_API}/assignments`),
        hydrateFallbackElement: <LoadingSpinner />,
        Component: Assignments
      },
      {
        path: 'about-Us',
        Component: AboutUs
      },
      {
        path: 'assignment/update/:id',
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API}/assignment/${params.id}`),
        hydrateFallbackElement: <LoadingSpinner />,
        Component: Update
      },
      {
        path: 'assignment/:id',
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API}/assignment/${params.id}`),
        hydrateFallbackElement: <LoadingSpinner />,
        Component: ViewAssignment
      }
    ]
  },
 {
    path: '/dashboard',
    element: <AuthPrivate><DashboardLayout /></AuthPrivate>,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'create-assignment', 
        element: <CreateAssignment />
      },
      {
        path: 'attempted-assignments', 
        element: <AttemdedAssignments />
      },
      {
        path: 'pending-assignments', 
        element: <PendingAssignments />
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
  },
  {
    path: '/*',
    element: <Error></Error>
  }
]);
