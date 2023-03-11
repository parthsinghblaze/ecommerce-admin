import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCategorys = createAsyncThunk('eCommerceApp/products/getProducts', async () => {
  const response = await axios.get('/category/categorys');
  const data = await response.data;

  console.log(data)

  return data;
});

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categoryList: [],
  },
  extraReducers: {
    [getCategorys.fulfilled]: (state, action) => {
      state.categoryList = action.payload.data.categories;
    },
  },
});

export default categorySlice.reducer;
