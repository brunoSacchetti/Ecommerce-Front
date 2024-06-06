import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ICategoria } from "../../types/Categoria";

interface IInitialState {
  searchBar: string;
  price: string | null;
  category: string | null;
  categoryData: ICategoria | null;
}

// Define el estado inicial utilizando esa interfaz
const initialState: IInitialState = {
  searchBar: "",
  price: null,
  category: null,
  categoryData: null
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
    setCategoryData: (state, action: PayloadAction<ICategoria>) => {
       state.categoryData = action.payload;
    },
    resetAll: (state) => {
      state.searchBar = "";
      state.price = null;
      state.category = null;
    },
  },
});

// Exporta las acciones del slice
export const { setSearch, setPrice, setCategory, resetAll, setCategoryData } = Filters.actions;

// Exporta el reducer del slice
export default Filters.reducer;
