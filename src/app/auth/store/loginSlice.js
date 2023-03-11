import { createSlice } from '@reduxjs/toolkit';
import jwtService from '../services/jwtService';
import { setUserData } from './userSlice';

export const submitLogin =
  ({ email, password }) =>
  async (dispatch) => {
    // dispatch(setLoading());
    return jwtService
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        // dispatch(setUserData(user));
        return dispatch(loginSuccess());
      })
      .catch((error) => {
        console.log('Error: ', error);
        let errorMessage = 'An error occurred during login.';
        errorMessage = error[0]?.message;
        return dispatch(loginError(errorMessage));
      });
  };

const initialState = {
  success: false,
  errors: [],
  loading: false,
};

const loginSlice = createSlice({
  name: 'auth/login',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.success = true;
      state.errors = [];
      state.loading = false;
    },
    loginError: (state, action) => {
      state.success = false;
      state.errors = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = true;
    },
  },
  extraReducers: {},
});

export const { loginSuccess, loginError, setLoading } = loginSlice.actions;

export default loginSlice.reducer;
