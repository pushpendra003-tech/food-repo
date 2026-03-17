import { useCartStore } from "../../store/cartStore"

export default function CartDrawer({ open, setOpen }: any) {

 const cart = useCartStore((state)=>state.cart)

 const total = cart.reduce((sum,item)=>sum + item.price,0)

 return (

  <div
   className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transition-transform ${
    open ? "translate-x-0" : "translate-x-full"
   }`}
  >

   <div className="p-6">

    <div className="flex justify-between mb-6">
     <h2 className="text-xl font-bold">Cart</h2>

     <button onClick={() => setOpen(false)}>✕</button>
    </div>

    {cart.length === 0 && <p>No items in cart</p>}

    {cart.map((item, index) => (

     <div
     key={index}
     className="flex justify-between mb-3 border-b pb-2"
     >

      <p>{item.name}</p>

      <p className="text-orange-500">
      ₹{item.price}
      </p>

     </div>

    ))}

    {cart.length > 0 && (

    <div className="mt-6">

     <div className="flex justify-between font-bold text-lg mb-4">

      <p>Total</p>
      <p>₹{total}</p>

     </div>

     <button
     className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
     >
     Checkout
     </button>

    </div>

    )}

   </div>

  </div>

 )
}