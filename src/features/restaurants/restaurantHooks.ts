import { useQuery } from "@tanstack/react-query"
import { getRestaurants } from "../../api/restaurantApi"

export const useRestaurants = () => {

 return useQuery({

  queryKey:["restaurants"],

  queryFn:getRestaurants

 })

}