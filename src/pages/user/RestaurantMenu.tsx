import MainLayout from "../../components/layout/MainLayout"
import FoodCard from "../../components/common/FoodCard"

const foods = [
 {name:"Cheese Pizza",price:250},
 {name:"Veg Burger",price:120},
 {name:"Chicken Biryani",price:300}
]

export default function RestaurantMenu(){

 return(

  <MainLayout>

   <div className="p-10">

    <h1 className="text-3xl font-bold mb-6">
     Restaurant Menu
    </h1>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

     {foods.map((f,i)=>(
      <FoodCard
       key={i}
       name={f.name}
       price={f.price}
      />
     ))}

    </div>

   </div>

  </MainLayout>

 )

}