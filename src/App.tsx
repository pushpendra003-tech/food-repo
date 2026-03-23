import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

// Auth
import Login from "./features/auth/Login"
import Signup from "./features/auth/Signup"

// Pages
import Home from "./pages/user/Home"
import Profile from "./pages/user/Profile"

// Restaurants
import Restaurants from "./features/restaurants/Restaurants"
import RestaurantMenu from "./pages/user/RestaurantMenu"

// Cart + Checkout + Orders
import Cart from "./pages/user/Cart"
import Checkout from "./pages/user/Checkout"
import Orders from "./pages/orders/Orders"
import OrderSuccess from "./pages/user/OrderSuccess"

// Favorites
import Favorites from "./pages/user/Favorites"

// Layout for protected pages
import MainLayout from "./components/layout/MainLayout"
import { useAuthStore } from "./store/authStore"
import OwnerDashboard from "./pages/owner/OwnerDashboard"
import DeliveryDashboard from "./pages/delivery/DeliveryDashboard"
import OwnerOrders from "../pages/owner/OwnerOrders"
import OwnerMenu from "../pages/owner/OwnerMenu"
import OwnerAnalytics from "../pages/owner/OwnerAnalytics"
import DeliveryOrders from "../pages/delivery/DeliveryOrders"
import DeliveryEarnings from "../pages/delivery/DeliveryEarnings"
import DeliveryProfile from "../pages/delivery/DeliveryProfile"

 // 🔐 Role Protected Route
 function PrivateRoute({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) {
  const auth = useAuthStore.getState()
  const token = localStorage.getItem("token")
  
  if (!token || !auth.user) {
    return <Navigate to="/login" />
  }
  
  if (allowedRoles && !allowedRoles.includes(auth.user.role)) {
    return <Navigate to="/home" />
  }
  
  return <>{children}</>
 }

export default function App() {

 return (

  <BrowserRouter>

   <Routes>

    {/* Public Routes - no layout */}
    <Route path="/" element={<Login />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />

    {/* Role Dashboards */}
    <Route path="/owner/dashboard" element={
      <PrivateRoute allowedRoles={['owner']}>
        <MainLayout><OwnerDashboard /></MainLayout>
      </PrivateRoute>
    } />
    <Route path="/owner/orders" element={
      <PrivateRoute allowedRoles={['owner']}>
        <MainLayout><OwnerOrders /></MainLayout>
      </PrivateRoute>
    } />
    <Route path="/owner/menu" element={
      <PrivateRoute allowedRoles={['owner']}>
        <MainLayout><OwnerMenu /></MainLayout>
      </PrivateRoute>
    } />
    <Route path="/owner/analytics" element={
      <PrivateRoute allowedRoles={['owner']}>
        <MainLayout><OwnerAnalytics /></MainLayout>
      </PrivateRoute>
    } />
    <Route path="/delivery/dashboard" element={
      <PrivateRoute allowedRoles={['delivery']}>
        <MainLayout><DeliveryDashboard /></MainLayout>
      </PrivateRoute>
    } />
    <Route path="/delivery/orders" element={
      <PrivateRoute allowedRoles={['delivery']}>
        <MainLayout><DeliveryOrders /></MainLayout>
      </PrivateRoute>
    } />
    <Route path="/delivery/earnings" element={
      <PrivateRoute allowedRoles={['delivery']}>
        <MainLayout><DeliveryEarnings /></MainLayout>
      </PrivateRoute>
    } />
    <Route path="/delivery/profile" element={
      <PrivateRoute allowedRoles={['delivery']}>
        <MainLayout><DeliveryProfile /></MainLayout>
      </PrivateRoute>
    } />

    {/* Protected Routes - with layout */}
    <Route
     path="/home"
     element={
      <PrivateRoute>
       <MainLayout><Home /></MainLayout>
      </PrivateRoute>
     }
    />

    <Route
     path="/restaurants"
     element={
      <PrivateRoute>
       <MainLayout><Restaurants /></MainLayout>
      </PrivateRoute>
     }
    />

    <Route
     path="/menu/:id"
     element={
      <PrivateRoute>
       <MainLayout><RestaurantMenu /></MainLayout>
      </PrivateRoute>
     }
    />

    <Route
     path="/cart"
     element={
      <PrivateRoute>
       <MainLayout><Cart /></MainLayout>
      </PrivateRoute>
     }
    />

    <Route
     path="/checkout"
     element={
      <PrivateRoute>
       <MainLayout><Checkout /></MainLayout>
      </PrivateRoute>
     }
    />

    <Route
     path="/order-success"
     element={
      <PrivateRoute>
       <MainLayout><OrderSuccess /></MainLayout>
      </PrivateRoute>
     }
    />

    <Route
     path="/orders"
     element={
      <PrivateRoute>
       <MainLayout><Orders /></MainLayout>
      </PrivateRoute>
     }
    />

    <Route
     path="/favorites"
     element={
      <PrivateRoute>
       <MainLayout><Favorites /></MainLayout>
      </PrivateRoute>
     }
    />

    <Route
     path="/profile"
     element={
      <PrivateRoute>
       <MainLayout><Profile /></MainLayout>
      </PrivateRoute>
     }
    />

    {/* Fallback Route */}
    <Route path="*" element={<Navigate to="/login" />} />

   </Routes>

  </BrowserRouter>

 )
}
