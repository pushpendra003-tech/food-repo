import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Login from "./features/auth/Login"
import Signup from "./features/auth/Signup"

import Home from "./pages/user/Home"
import Profile from "./pages/user/Profile"

import Restaurants from "./features/restaurants/Restaurants"
import RestaurantMenu from "./pages/user/RestaurantMenu"
import Cart from "./pages/user/Cart"
import Checkout from "./pages/user/Checkout"
import Orders from "./pages/orders/Orders"

function PrivateRoute({ children }: any) {
 const token = localStorage.getItem("token")
 return token ? children : <Navigate to="/login" />
}

export default function App() {

 return (

  <BrowserRouter>

   <Routes>

    <Route path="/" element={<Navigate to="/login" />} />

    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />

    <Route
     path="/home"
     element={<PrivateRoute><Home/></PrivateRoute>}
    />

    <Route
     path="/restaurants"
     element={<PrivateRoute><Restaurants/></PrivateRoute>}
    />

    <Route
     path="/menu/:id"
     element={<PrivateRoute><RestaurantMenu/></PrivateRoute>}
    />

    <Route
     path="/cart"
     element={<PrivateRoute><Cart/></PrivateRoute>}
    />

    <Route
     path="/checkout"
     element={<PrivateRoute><Checkout/></PrivateRoute>}
    />

    <Route
     path="/profile"
     element={<PrivateRoute><Profile/></PrivateRoute>}
    />

    <Route
     path="/orders"
     element={<PrivateRoute><Orders/></PrivateRoute>}
    />

   </Routes>

  </BrowserRouter>

 )
}