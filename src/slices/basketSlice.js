import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState, //argument, gives slice its initial state of variables 
  reducers: { //this is how we dispatch actions:
    //actions have payloads inside of it: 
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload] //spread operator to get what the current items are //payload = the product we passed in Product.jsx
    }, 
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex((basketItem) => basketItem.id === action.payload.id);

      let newBasket = [...state.items]; //copy of the basket

      if (index >= 0) {
        // The item exists in the basket... remove it..
        newBasket.splice(index, 1)
      } else {
        console.warn(
          `Can't remove product (id: ${action.payload.id}) as cart is empty.`
        )
      };
      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions; //how we can use them throughhout the rest of the app

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
// we are 'reducing' through (iterating) t
export const selectTotal = (state) => 
state.basket.items.reduce((total, item) => total + item.price, 0)

export default basketSlice.reducer;
