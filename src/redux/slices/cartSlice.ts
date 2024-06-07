import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import IArticulo from '../../types/IArticulo'

// Define the initial state using that type
const initialState: {
    totalCount: number,
    productsList: IArticulo[],
    productQuantities: { [id: number]: number }
  } = {
    totalCount: 0,
    productsList: [],
    productQuantities: {} 
  }
export const cartSlice = createSlice({
  name: 'cart',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: initialState,
  reducers: {
    addProductToCart: (state, action) => { //en el action va a venir un product
        state.productsList = [...state.productsList, action.payload] // lo que ya tengo en ese estado mas el payload
        state.totalCount += 1;
    },
    updateProductQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
        const { id, quantity } = action.payload;
        state.productQuantities[id] = Math.max(quantity, 1); // Actualiza la cantidad asegurándose de que sea al menos 1
    },
    removeProductFromCart: (state, action) => { //va a venir el id
        const productId = action.payload;
        state.totalCount -= 1;
        state.productsList = state.productsList.filter(product => product.id !== productId); // devolvemos todos los productos menos el que quitamos;
    },
    /* updateProductQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const { id, quantity } = action.payload;
      state.productsList = state.productsList.map(product =>
        product.id === id ? { ...product, quantity } : product
    ); */
    resetCart: (state) => {
      state.totalCount = 0;
      state.productsList = [];
    }
  }
})

export const { addProductToCart, resetCart, updateProductQuantity, removeProductFromCart} = cartSlice.actions //removeProductFromCart, updateProductQuantity, resetCart } = cartSlice.actions

export default cartSlice.reducer