import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  searchBar: string;
  price: string | null;
  category: string | null;
}

// Define el estado inicial utilizando esa interfaz
const initialState: IInitialState = {
  searchBar: "",
  price: null,
  category: null,
};

// Crea el slice de Redux
export const Filters = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.searchBar = action.payload;
    },
    setPrice: (state, action: PayloadAction<string | null>) => {
      state.price = action.payload;
    },
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.category = action.payload;
      state.price = null;
    },
    resetAll: (state) => {
      state.searchBar = "";
      state.price = null;
      state.category = null;
    },
  },
});

// Exporta las acciones del slice
export const { setSearch, setPrice, setCategory, resetAll } = Filters.actions;

// Exporta el reducer del slice
export default Filters.reducer;
