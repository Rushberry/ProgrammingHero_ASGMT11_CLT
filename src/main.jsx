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
import AvailableCars from './elements/AvailableCars';
import MyBookings from './elements/MyBookings';

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
        element: <AddCar></AddCar>
      },
      {
        path: '/availableCars',
        element: <AvailableCars></AvailableCars>
      },
      {
        path: '/myBookings',
        element: <MyBookings></MyBookings>
      },
      {
        
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
