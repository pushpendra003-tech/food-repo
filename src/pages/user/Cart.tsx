import { useCartStore } from "../../store/cartStore"

export default function Cart(){

 const cart=useCartStore((s)=>s.cart)
 const remove=useCartStore((s)=>s.removeFromCart)

 const total=cart.reduce((sum,item)=>sum+item.price,0)

 return(

 <div className="p-10">

 <h1 className="text-3xl font-bold mb-6">
 Cart
 </h1>

 {cart.map((item)=>(

 <div key={item.id} className="flex justify-between border-b py-3">

 <p>{item.name}</p>

 <div className="flex gap-4">

 <p>₹{item.price}</p>

 <button
 onClick={()=>remove(item.id)}
 className="text-red-500"
 >
 Remove
 </button>

 </div>

 </div>

 ))}

 <h2 className="mt-6 font-bold text-xl">
 Total ₹{total}
 </h2>

 </div>

 )

}