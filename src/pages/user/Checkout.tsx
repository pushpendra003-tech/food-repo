import { useCartStore } from "../../store/cartStore"
import { useNavigate } from "react-router-dom"

export default function Checkout(){

 const cart = useCartStore((s)=>s.cart)
 const clearCart = useCartStore((s)=>s.clearCart)

 const navigate = useNavigate()

 const total = cart.reduce((sum,item)=>sum+item.price,0)

 const placeOrder = ()=>{

 alert("Order Placed Successfully 🎉")

 clearCart()

 navigate("/orders")

 }

 return(

 <div className="max-w-4xl mx-auto py-10">

 <h1 className="text-3xl font-bold mb-6">
 Checkout
 </h1>

 {cart.map((item)=>(
 
 <div
 key={item.id}
 className="flex justify-between border-b py-3"
 >

 <p>{item.name}</p>

 <p>₹{item.price}</p>

 </div>

 ))}

 <h2 className="text-xl font-bold mt-6">
 Total: ₹{total}
 </h2>

 <button
 onClick={placeOrder}
 className="mt-6 bg-green-500 text-white px-6 py-3 rounded"
 >
 Place Order
 </button>

 </div>

 )

}