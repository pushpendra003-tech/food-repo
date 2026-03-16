import { Link } from "react-router-dom"

export default function Navbar(){

 const token = localStorage.getItem("token")

 return(

  <nav className="bg-white shadow-sm border-b">

   <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">

    <h1 className="text-2xl font-bold text-orange-500">
     FoodApp
    </h1>

    <div className="flex items-center gap-6">

     {!token && (
      <>
       <Link
        to="/login"
        className="text-gray-700 hover:text-orange-500"
       >
        Login
       </Link>

       <Link
        to="/signup"
        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
       >
        Signup
       </Link>
      </>
     )}

     {token && (
      <Link
       to="/profile"
       className="text-gray-700 hover:text-orange-500"
      >
       Profile
      </Link>
     )}

    </div>

   </div>

  </nav>

 )

}