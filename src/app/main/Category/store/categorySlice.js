import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage } from 'app/store/fuse/messageSlice';
import { mutate } from 'swr';

async function fetchCategory() {
  const page = 0;
  const rowsPerPage = 10;
  const searchText = '';
  await mutate(
      `admin/category/categories?page=${page}&limit=${rowsPerPage}&keyword=${searchText}`
  );
}

export const addCategory = createAsyncThunk(
  'categories/add',
  async ({ formData, reset, setPreviewImage }, { dispatch }) => {
    try {
      const response = await axios.post(`/admin/category`, formData);
      const jsonData = await response;

      if (jsonData.status === 200) {
        dispatch(showMessage({ message: jsonData.data.message }));
        await fetchCategory();
        dispatch(toggleModel());
        reset();
        setPreviewImage('');
      }
    } catch (error) {
      // dispatch(toggleModel());
      dispatch(setError({ message: error.response.data.message }));
    }
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    searchText: '',
    isLoading: true,
    categoryList: [],
    totalCount: 0,
    isOpen: false,
    error: '',
  },
  reducers: {
    setError: (state, action) => {
      state.error = action.payload.message;
    },
    setTotalCount: (state, action) => {
      state.totalCount = action.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    toggleModel: (state, action) => {
      state.isOpen = !state.isOpen;
    },
    setCategoryList: (state, action) => {
      state.isLoading = false;
      state.categoryList = action.payload.data.categories;
      state.totalCount = action.payload.total;
    },
    removeError: (state, action) => {
      state.error = '';
    },
  },
  extraReducers: {
  },
});

export const { setTotalCount, setSearchText, toggleModel, setCategoryList, setError, removeError } = categorySlice.actions;

export default categorySlice.reducer;
