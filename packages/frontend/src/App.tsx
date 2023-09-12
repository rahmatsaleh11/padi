import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./Layout";
import User from "./pages/User";
import Home from "./pages/Home";
import CreatePadi from "./pages/Padi/createPadi";

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Users from "./pages/Users";
import CreateBerita from "./pages/Berita";
import BeritaSingle from "./pages/Berita/Single";
import InfoEdit from "./pages/Info";
import Contact from "./pages/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/user",
        element: <User />
      },
      {
        path: "/padi",
        children: [
          {
            path: "/padi/create",
            element: <CreatePadi />
          }
        ]
      },
      {
        path : "/users",
        element  : <Users/>
      },
      {
        path : "/berita",
        children : [
          {
            index : true,
            element : <CreateBerita/>
          },
          {
            path : "/berita/:id",
            element : <BeritaSingle/>
          }
        ]
      },
      {
        path : "/info",
        element : <InfoEdit/>
      },
      {
        path : "/contact",
        element : <Contact/>
      }
    ]
  },
]);

export default function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RouterProvider router={router} />
    </LocalizationProvider>
  )
}