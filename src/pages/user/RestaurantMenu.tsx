import { useParams } from "react-router-dom"
import FoodCard from "../../components/common/FoodCard"

const foods=[
{
id:1,
name:"Cheese Pizza",
price:250,
img:"https://images.unsplash.com/photo-1513104890138-7c749659a591"
},
{
id:2,
name:"Veg Burger",
price:120,
img:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
},
{
id:3,
name:"Chicken Biryani",
price:300,
img:"https://images.unsplash.com/photo-1604908176997-125f25cc6f3d"
}
]

export default function RestaurantMenu(){

 const {id}=useParams()

 return(

 <div className="p-10">

 <h1 className="text-3xl font-bold mb-6">
 Restaurant Menu {id}
 </h1>

 <div className="grid md:grid-cols-3 gap-6">

 {foods.map((food)=>(
 <FoodCard
 key={food.id}
 id={food.id}
 name={food.name}
 price={food.price}
 img={food.img}
 />
 ))}

 </div>

 </div>

 )

}