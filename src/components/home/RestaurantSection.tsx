import RestaurantCard from "../common/RestaurantCard"

const restaurants=[
 {name:"Pizza Palace",image:"https://picsum.photos/400",rating:4.5},
 {name:"Burger House",image:"https://picsum.photos/401",rating:4.2},
 {name:"Biryani King",image:"https://picsum.photos/402",rating:4.6},
]

export default function RestaurantSection(){

 return(

  <div className="max-w-7xl mx-auto px-4 py-12">

   <h2 className="text-2xl font-bold mb-6">
    Top Restaurants
   </h2>

   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

    {restaurants.map((r,i)=>(
     <RestaurantCard
      key={i}
      name={r.name}
      image={r.image}
      rating={r.rating}
     />
    ))}

   </div>

  </div>

 )

}