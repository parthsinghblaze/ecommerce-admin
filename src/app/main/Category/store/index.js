import { combineReducers } from '@reduxjs/toolkit';
import categorySlice from './categorySlice';

const reducer = combineReducers({
    categorySlice,
});

export default reducer;
