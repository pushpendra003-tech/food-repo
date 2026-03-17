import { create } from "zustand"

type Food = {
 id:number
 name:string
}

type FavState = {
 favs:Food[]
 toggleFav:(food:Food)=>void
}

export const useFavStore = create<FavState>((set)=>({

 favs:[],

 toggleFav:(food)=>
 set((state)=>{

  const exists = state.favs.find(f=>f.id===food.id)

  if(exists){
   return{
    favs:state.favs.filter(f=>f.id!==food.id)
   }
  }

  return{
   favs:[...state.favs,food]
  }

 })

}))