interface Props{
    name:string
    price:number
   }
   
   export default function FoodCard({name,price}:Props){
   
    return(
   
     <div className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition">
   
      <h3 className="font-semibold text-lg">
       {name}
      </h3>
   
      <p className="text-gray-500 mb-3">
       ₹{price}
      </p>
   
      <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
       Add to Cart
      </button>
   
     </div>
   
    )
   
   }