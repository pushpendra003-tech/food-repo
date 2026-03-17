import { Link, useNavigate } from "react-router-dom"
import { ShoppingCart, User } from "lucide-react"
import { useState } from "react"
import CartDrawer from "../../features/cart/CartDrawer"
import { useCartStore } from "../../store/cartStore"

export default function Navbar(){

 const navigate = useNavigate()
 const token = localStorage.getItem("token")

 const [open,setOpen] = useState(false)

 const cart = useCartStore((state)=>state.cart)

 const toggleDark = () => {
  document.body.classList.toggle("dark")
 }

 const handleLogout = () => {
  localStorage.removeItem("token")
  navigate("/login")
 }

 return(

 <>
 
 <nav className="bg-white shadow-sm border-b sticky top-0">

 <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">

 <h1
 onClick={()=>navigate("/home")}
 className="text-2xl font-bold text-orange-500 cursor-pointer"
 >
 FoodApp
 </h1>

 <div className="flex items-center gap-6">

 <button
 onClick={toggleDark}
 className="text-xl"
 >
 🌙
 </button>

 {!token && (

 <>
 <Link to="/login">Login</Link>

 <Link
 to="/signup"
 className="bg-orange-500 text-white px-4 py-2 rounded"
 >
 Signup
 </Link>
 </>

 )}

 {token && (

 <div className="flex items-center gap-6">

 {/* CART ICON */}

 <div className="relative">

 <ShoppingCart
 size={24}
 className="cursor-pointer"
 onClick={()=>setOpen(true)}
 />

 {cart.length > 0 && (

 <span
 className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full"
 >
 {cart.length}
 </span>

 )}

 </div>

 <User
 size={24}
 className="cursor-pointer"
 onClick={()=>navigate("/profile")}
 />

 <button
 onClick={handleLogout}
 className="text-red-500"
 >
 Logout
 </button>

 </div>

 )}

 </div>

 </div>

 </nav>

 <CartDrawer open={open} setOpen={setOpen}/>

 </>

 )

}