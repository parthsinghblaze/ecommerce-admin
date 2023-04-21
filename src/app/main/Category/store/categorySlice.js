import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage } from 'app/store/fuse/messageSlice';
import { mutate } from 'swr';

async function fetchCategory({ page, rowsPerPage, searchText }) {
  const pageNumber = page || 0;
  const rowsPerPageView = rowsPerPage || 10;
  const searchTextValue = searchText || '';
  await mutate(`admin/category/categories?page=${pageNumber}&limit=${rowsPerPageView}&keyword=${searchTextValue}`);
}

export const addCategory = createAsyncThunk(
  'categories/add',
  async ({ formData, reset, setPreviewImage }, { dispatch }) => {
    try {
      const response = await axios.post(`/admin/category`, formData);
      const jsonData = await response;

      if (jsonData.status === 200) {
        dispatch(showMessage({ message: jsonData.data.message }));
        await fetchCategory({ page: 0, rowsPerPage: 10, searchText: '' });
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

export const deleteCategory = createAsyncThunk(
  'categories/delete',
  async ({ categoryID, handleConfirmDialog, page, rowsPerPage, searchText }, { dispatch }) => {
    try {
      const response = await axios.delete(`/admin/category/${categoryID}`);
      const jsonData = await response;

      if (jsonData.status === 200) {
        await fetchCategory({ page, rowsPerPage, searchText });
        handleConfirmDialog();
        dispatch(showMessage({ message: jsonData.data.message }));
      }
    } catch (error) {
      console.log('error', error);
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
    editDialogOpen: false,
    editDialogValue: {}
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
    openEditDialog: (state, action) => {
      state.editDialogOpen = true;
      state.editDialogValue = action.payload
    },
    closeEditDialog: (state, action) => {
      state.editDialogOpen = false;
      state.editDialogValue = {};
    }
  },
  extraReducers: {},
});

export const { setTotalCount, setSearchText, toggleModel, setCategoryList, setError, removeError, openEditDialog, closeEditDialog } =
  categorySlice.actions;

export default categorySlice.reducer;
