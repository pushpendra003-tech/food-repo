import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "../pages/user/Home"
import Login from "../features/auth/Login"
import Signup from "../features/auth/Signup"
import ForgotPassword from "../features/auth/ForgotPassword"
import CartPage from "../features/cart/CartPage"

// Owner imports
import ProtectedOwnerRoute from "./ProtectedOwnerRoute"
import OwnerLayout from "../components/layout/OwnerLayout"
import OwnerDashboard from "../pages/owner/OwnerDashboard"
import OwnerOrders from "../../pages/owner/OwnerOrders"
import OwnerMenu from "../../pages/owner/OwnerMenu"
import OwnerAnalytics from "../../pages/owner/OwnerAnalytics"

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/cart" element={<CartPage />} />

        {/* Owner Routes */}
        <Route path="/owner" element={
          <ProtectedOwnerRoute>
            <OwnerLayout />
          </ProtectedOwnerRoute>
        }>
          <Route index element={<OwnerDashboard />} />
          <Route path="dashboard" element={<OwnerDashboard />} />
          <Route path="orders" element={<OwnerOrders />} />
          <Route path="menu" element={<OwnerMenu />} />
          <Route path="analytics" element={<OwnerAnalytics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

