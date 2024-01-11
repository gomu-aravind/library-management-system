import { createSlice } from "@reduxjs/toolkit";

const saveToLocalStorage=(items,totalQuantity,totalAmount)=>{
  localStorage.setItem('cart',JSON.stringify(items))
  localStorage.setItem('totalQuantity',JSON.stringify(totalQuantity))
  localStorage.setItem('totalAmount',JSON.stringify(totalAmount))
}

const removeFromLocal=()=>{
  localStorage.clear()
}

const cartSlice=createSlice({
  name: "cart",
  initialState: {
    items: [] ,
    totalQuantity: 0 ,
    totalAmount:0,
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => (item.id === newItem.id));
      state.totalQuantity++;
      state.totalAmount=state.totalAmount+newItem.price
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          image:newItem.image,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          title:newItem.title
        });
      }else{
        existingItem.quantity++;
        existingItem.totalPrice=existingItem.totalPrice+newItem.price
        
      }
      saveToLocalStorage(state.items,state.totalQuantity,state.totalAmount)
    },
    removeItemFromCart(state,action) {
        const id=action.payload
        const existingItem=state.items.find((item)=>item.id===id)
        
        state.totalQuantity--;
        state.totalAmount=state.totalAmount-existingItem.price

        if(existingItem.quantity===1){
            state.items=state.items.filter(item=>item.id!==id)
        }else{
            existingItem.quantity--;
            existingItem.totalPrice=existingItem.totalPrice-existingItem.price

        }
        saveToLocalStorage(state.items,state.totalQuantity,state.totalAmount)
    },
    clearCart(state){
      state.items=[];
      state.totalQuantity=0;
      state.totalAmount=0;
      removeFromLocal()
    },
    deleteItemsInCart(state,action){
      const id=action.payload;
      const existingItem=state.items.find(item=>item.id===id)
      state.totalQuantity=state.totalQuantity-existingItem.quantity
      state.totalAmount=state.totalAmount-existingItem.totalPrice
      state.items=state.items.filter(item=>item.id!==id)
      saveToLocalStorage(state.items,state.totalQuantity,state.totalAmount)
    },
    initializeCart(state,action){
      state.items=action.payload.items,
      state.totalAmount=action.payload.totalAmount,
      state.totalQuantity=action.payload.totalQuantity
    },
    setTotalAmount(state,action){
      state.totalAmount=action.payload.updatedTotal
      localStorage.setItem('totalAmount',state.totalAmount)
    }
  },
});

export const cartActions= cartSlice.actions

export default cartSlice