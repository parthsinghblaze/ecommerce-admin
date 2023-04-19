import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage } from 'app/store/fuse/messageSlice';

export const getCategorys = createAsyncThunk(
  'categories',
  async ({ page, limit, keyword }, { dispatch }) => {

    const response = await axios.get(`admin/category/categories?page=${page}&limit=${limit}&keyword=${keyword}`);
    const data = await response.data;

    dispatch(setTotalCount(data.total));

    return data;
  }
);

export const addCategory = createAsyncThunk('categories/add', async (formValue, { dispatch }) => {

  try {
    const response = await axios.post(`/categorysss`, formValue);
    const jsonData = await response;

    console.log('data', jsonData);

    if(jsonData.status === 200) {
      console.log('hello i am status 200')
      dispatch(showMessage({ message: jsonData.data.message }));
      dispatch(getCategorys({ page: 1, limit: 10, keyword: '' }));
      dispatch(toggleModel());
    }

  } catch (error) {
    dispatch(toggleModel());
    dispatch(showMessage({ message: error.response.data.message }));
  }

})

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    searchText: '',
    isLoading: true,
    categoryList: [],
    totalCount: 0,
    isOpen: false,
  },
  reducers: {
    setTotalCount: (state, action) => {
      state.totalCount = action.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    toggleModel: (state, action) => {
      state.isOpen = !state.isOpen;
    },
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

export const { setTotalCount, setSearchText, toggleModel } = categorySlice.actions;

export default categorySlice.reducer;
