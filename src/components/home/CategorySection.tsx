const categories = ["Pizza","Burger","Biryani","Chinese","Desserts"]

export default function CategorySection(){

 return(

  <div className="max-w-7xl mx-auto px-4 py-12">

   <h2 className="text-2xl font-bold mb-6">
    Popular Categories
   </h2>

   <div className="flex gap-4 flex-wrap">

    {categories.map((c,i)=>(
     <div
      key={i}
      className="px-6 py-3 bg-white border rounded-full shadow-sm hover:bg-orange-500 hover:text-white cursor-pointer transition"
     >
      {c}
     </div>
    ))}

   </div>

  </div>

 )

}