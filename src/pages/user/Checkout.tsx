import MainLayout from "../../components/layout/MainLayout"
import { useCartStore } from "../../store/cartStore"

export default function Checkout(){

 const {items}=useCartStore()

 return(

  <MainLayout>

   <div className="p-10">

    <h1 className="text-3xl font-bold mb-6">
     Checkout
    </h1>

    {items.map((item,i)=>(
     <div key={i} className="border p-3 mb-2">
      {item.name} - ₹{item.price}
     </div>
    ))}

    <button className="mt-6 bg-black text-white px-6 py-3 rounded">
     Place Order
    </button>

   </div>

  </MainLayout>

 )

}