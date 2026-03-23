interface Props{
    name:string
    image:string
    rating:number
   }
   
   export default function RestaurantCard({name,image,rating}:Props){
   
    return(
   
     <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
   
      <img
       src={image}
       className="w-full h-40 object-cover"
      />
   
      <div className="p-4">
   
       <h3 className="font-bold text-black text-lg mb-2 line-clamp-1">
        {name}
       </h3>
   
       <p className="text-gray-500 text-sm">
        ⭐ {rating}
       </p>
   
      </div>
   
     </div>
   
    )
   
   }