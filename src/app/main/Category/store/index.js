import { combineReducers } from '@reduxjs/toolkit';
import category from './categorySlice';

const reducer = combineReducers({
  category,
});

export default reducer;
