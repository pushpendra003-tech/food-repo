import { useCartStore } from "../../store/cartStore"

export default function CartPage(){

 const {items}=useCartStore()

 return(

  <div className="p-10">

   <h2 className="text-2xl font-bold mb-6">
    Your Cart
   </h2>

   {items.map((item)=>(
    <div
     key={item.id}
     className="border p-4 mb-3"
    >

     {item.name} - ₹{item.price}

    </div>
   ))}

  </div>

 )

}