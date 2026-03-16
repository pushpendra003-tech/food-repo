import MainLayout from "../../components/layout/MainLayout"
import Hero from "../../components/home/Hero"
import CategorySection from "../../components/home/CategorySection"
import RestaurantSection from "../../components/home/RestaurantSection"

export default function Home(){

 return(

  <MainLayout>

   <Hero/>

   <CategorySection/>

   <RestaurantSection/>

  </MainLayout>

 )

}