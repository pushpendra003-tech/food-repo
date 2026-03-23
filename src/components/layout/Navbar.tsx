import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuthStore } from "../../store/authStore"
import { useCartStore } from "../../store/cartStore"
import { Sun, Moon } from "lucide-react"

export default function Navbar(){
 const auth = useAuthStore()
 const cart = useCartStore((state) => state.cart)
 const location = useLocation()
 const navigate = useNavigate()
 const role = auth.user?.role

 const totalItems = cart.reduce(
  (sum, item) => sum + item.qty,
  0
 )

 const logout = () => {
  localStorage.removeItem("token")
  auth.logout()
  navigate("/login")
 }

 const isActive = (path:string) =>
  location.pathname === path
   ? "text-orange-500 font-bold"
   : ""

 return(

<nav className="bg-white dark:bg-gray-900 shadow-lg px-6 py-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-800">

  <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
   FoodApp
  </h1>

  <div className="flex items-center gap-4">
    
    {/* Role Badge */}
    {role && (
      <div className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full font-semibold text-sm shadow-lg">
        {role === 'owner' ? '👑 Owner' : role === 'delivery' ? '🚚 Delivery' : '👤 Customer'}
      </div>
    )}

    {/* User Links */}
    {role === 'user' && (
      <div className="hidden md:flex gap-6">
        <Link to="/home" className={isActive("/home") + " hover:text-orange-500 dark:hover:text-orange-400 transition-colors"}>Home</Link>
        <Link to="/orders" className={isActive("/orders") + " hover:text-orange-500 dark:hover:text-orange-400 transition-colors"}>Orders</Link>
        <Link to="/favorites" className={isActive("/favorites") + " hover:text-orange-500 dark:hover:text-orange-400 transition-colors"}>Favorites</Link>
      </div>
    )}

    {/* Owner Links */}
    {role === 'owner' && (
      <div className="hidden md:flex gap-6">
        <Link to="/owner/dashboard" className={isActive("/owner/dashboard") + " hover:text-orange-500 dark:hover:text-orange-400 transition-colors"}>Dashboard</Link>
        <Link to="/owner/orders" className={isActive("/owner/orders") + " hover:text-orange-500 dark:hover:text-orange-400 transition-colors"}>Orders</Link>
        <Link to="/owner/menu" className={isActive("/owner/menu") + " hover:text-orange-500 dark:hover:text-orange-400 transition-colors"}>Menu</Link>
        <Link to="/owner/analytics" className={isActive("/owner/analytics") + " hover:text-orange-500 dark:hover:text-orange-400 transition-colors"}>Analytics</Link>
      </div>
    )}

    {/* Delivery Links */}
    {role === 'delivery' && (
      <div className="hidden md:flex gap-6">
        <Link to="/delivery/dashboard" className={isActive("/delivery/dashboard") + " hover:text-orange-500 dark:hover:text-orange-400 transition-colors"}>Dashboard</Link>
        <Link to="/delivery/orders" className={isActive("/delivery/orders") + " hover:text-orange-500 dark:hover:text-orange-400 transition-colors"}>Orders</Link>
        <Link to="/delivery/earnings" className={isActive("/delivery/earnings") + " hover:text-orange-500 dark:hover:text-orange-400 transition-colors"}>Earnings</Link>
        <Link to="/delivery/profile" className={isActive("/delivery/profile") + " hover:text-orange-500 dark:hover:text-orange-400 transition-colors"}>Profile</Link>
      </div>
    )}

    {/* Cart */}
    <Link to="/cart" className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all">
      🛒
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold shadow-lg">
          {totalItems}
        </span>
      )}
    </Link>

    <button
      onClick={logout}
      className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white px-5 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
    >
      Logout
    </button>

  </div>

 </nav>

 )
}
