import { create } from "zustand"

interface CartItem{
 id:number
 name:string
 price:number
}

interface CartState{

 items:CartItem[]

 addItem:(item:CartItem)=>void

}

export const useCartStore = create<CartState>((set)=>({

 items:[],

 addItem:(item)=>set((state)=>({
  items:[...state.items,item]
 }))

}))