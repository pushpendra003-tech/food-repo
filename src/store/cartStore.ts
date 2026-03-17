import { create } from "zustand"

type Item={
 id:number
 name:string
 price:number
 img:string
}

type CartState={
 cart:Item[]
 addToCart:(item:Item)=>void
 removeFromCart:(id:number)=>void
}

export const useCartStore=create<CartState>((set)=>({

 cart:[],

 addToCart:(item)=>
 set((state)=>({
  cart:[...state.cart,item]
 })),

 removeFromCart:(id)=>
 set((state)=>({
  cart:state.cart.filter(i=>i.id!==id)
 }))

}))