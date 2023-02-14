import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCategorys = createAsyncThunk('eCommerceApp/products/getProducts', async () => {
  const response = await axios.get('/category/categorys');
  const data = await response.data;

  return data;
});

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categoryList: [],
  },
  extraReducers: {
    [getCategorys.fulfilled]: (state, action) => {
      action.categoryList = action.payload;
    },
  },
});

export default categorySlice.reducer;
