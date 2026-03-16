import { BrowserRouter,Routes,Route } from "react-router-dom"

import Home from "../pages/user/Home"
import Login from "../features/auth/Login"
import Signup from "../features/auth/Signup"
import CartPage from "../features/cart/CartPage"

export default function AppRoutes(){

 return(

  <BrowserRouter>

   <Routes>

    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/cart" element={<CartPage/>}/>

   </Routes>

  </BrowserRouter>

 )

}