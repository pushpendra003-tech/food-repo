import { useRestaurants } from "./restaurantHooks"
import RestaurantCard from "../../components/common/RestaurantCard"
import Loader from "../../components/common/Loader"

export default function RestaurantList(){

 const {data,isLoading}=useRestaurants()

 if(isLoading) return <Loader/>

 return(

  <div className="grid grid-cols-3 gap-6 p-10">

   {data.map((r:any)=>(
    <RestaurantCard
     key={r._id}
     name={r.name}
     image={r.image}
     rating={r.rating}
    />
   ))}

  </div>

 )

}