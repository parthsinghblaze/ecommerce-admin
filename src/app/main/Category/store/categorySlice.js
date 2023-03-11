import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCategorys = createAsyncThunk(
  'categories',
  async ({ page, limit, keyword }, { dispatch }) => {
    const response = await axios.get(`/category/categorys?page=${page}&limit=${limit}&keyword=${keyword}`);
    const data = await response.data;

    dispatch(setTotalCount(data.total));

    return data;
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    searchText: '',
    isLoading: true,
    categoryList: [],
    totalCount: 0,
  },
  reducers: {
    setTotalCount: (state, action) => {
      state.totalCount = action.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    }
  },
  extraReducers: {
    [getCategorys.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getCategorys.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.categoryList = action.payload.data.categories;
    },
    [getCategorys.rejected]: (state, action) => {
      state.isLoading = false;
      state.categoryList = [];
    },
  },
});

export const { setTotalCount, setSearchText } = categorySlice.actions;

export default categorySlice.reducer;
