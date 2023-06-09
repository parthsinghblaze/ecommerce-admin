import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";
import {showMessage} from "app/store/fuse/messageSlice";
import {action} from "mobx";

export const addProduct = createAsyncThunk('addProduct', async ({formData, navigate}, { dispatch }) => {
  try {
    dispatch(addProductStart());
    const response = await axios.post('/admin/product', formData)
    if(response.status === 200) {
      dispatch(showMessage({ message: response.data.message }));
      navigate('/products');
      dispatch(addProductStop());
    }
  } catch (e) {
    console.log('error', e)
    dispatch(addProductStop());
    dispatch(showMessage({ message: 'Some thing went Wrong' }));
  }
})

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    addingProductLoading: false
  },
  reducers: {
    addProductStart: (state, action) => {
      state.addingProductLoading = true
    },
    addProductStop: (state, action) => {
      state.addingProductLoading = false
    }
  },
});

export const  {addProductStart, addProductStop} = productSlice.actions

export default productSlice.reducer;
