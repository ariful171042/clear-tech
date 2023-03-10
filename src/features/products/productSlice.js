import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status: null,
};

export const productFetching = createAsyncThunk(
  "products/productFetching",
  async () => {
    const res = await axios.get(
      "https://eager-sable-airedale.glitch.me/products"
    );
    return res.data;
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(productFetching.pending, (state, action) => {
      state.status = "pending";
    });

    builder.addCase(productFetching.fulfilled, (state, action) => {
      state.status = "successfull";
      state.items = action.payload;
    });

    builder.addCase(productFetching.rejected, (state, action) => {
      state.status = "Rejected";
    });
  },
});

export default productSlice.reducer;
