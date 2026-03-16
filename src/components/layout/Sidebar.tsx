import { Link } from "react-router-dom"

export default function Sidebar(){

 return(

  <div className="w-64 bg-gray-900 text-white h-screen p-5">

   <h2 className="text-xl font-bold mb-8">
    Owner Panel
   </h2>

   <nav className="flex flex-col gap-4">

    <Link to="/owner" className="hover:text-gray-300">
     Dashboard
    </Link>

    <Link to="/owner/menu" className="hover:text-gray-300">
     Manage Menu
    </Link>

    <Link to="/owner/orders" className="hover:text-gray-300">
     Orders
    </Link>

    <Link to="/owner/analytics" className="hover:text-gray-300">
     Analytics
    </Link>

   </nav>

  </div>

 )

}