// src/redux/slice/shopSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts } from "../thunk/productThunkAPI";
import { PlantInfo } from "../../components/common/PlantInfo";
// import { fetchAllProducts } from "../thunk/fetchProducts";
const plantData = PlantInfo;
const shopSlice = createSlice({
  name: "shop",
  initialState: {
    products: plantData,
    loading: false,
    error: null,
  },
  reducers: {
    // (Optional) Other synchronous reducers
    // addPlants: (action,state)=>{
    //   state.products = action.payload;
    // }
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchAllProducts.pending, (state) => {
  //       state.loading = true;
  //       state.error = null;
  //     })
  //     .addCase(fetchAllProducts.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.products = action.payload;
  //     })
  //     .addCase(fetchAllProducts.rejected, (state, action) => {
  //       state.loading = false;
  //       state.error = action.payload;
  //     });
  // },
});

export default shopSlice.reducer;
