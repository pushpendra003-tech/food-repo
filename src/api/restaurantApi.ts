import { api } from "./apiClient"

export const getRestaurants = async () => {

 const res = await api.get("/restaurants")

 return res.data

}