import { Link } from "react-router-dom"

export default function BottomNav(){

 return(

  <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-3 md:hidden">

   <Link to="/">Home</Link>
   <Link to="/cart">Cart</Link>
   <Link to="/profile">Profile</Link>

  </div>

 )

}