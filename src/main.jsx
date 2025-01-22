import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './components/Root';
import Home from './elements/Home';
import ErrorPage from './elements/ErrorPage';
import AuthProvider from './providers/AuthProvider';
import Login from './elements/Login';
import Register from './elements/Register';
import AddCar from './elements/AddCar';
import AccessProvider from './providers/AccessProvider.jsx';
import AvailableCars from './elements/AvailableCars';
import MyBookings from './elements/MyBookings';
import MyCars from './elements/MyCars';
import Car from './elements/Car.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/addCar',
        element: <AccessProvider><AddCar></AddCar></AccessProvider>
      },
      {
        path: '/availableCars',
        element: <AvailableCars></AvailableCars>
      },
      {
        path: '/myBookings',
        element: <AccessProvider><MyBookings></MyBookings></AccessProvider>
      },
      {
        path: '/myCars',
        element: <AccessProvider><MyCars></MyCars></AccessProvider>
      },
      {
        path: '/car/:id',
        loader: ({ params }) => fetch(`http://localhost:2025/car/${params.id}`),
        element: <Car></Car>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
