/* eslint import/no-extraneous-dependencies: off */
import { createSlice } from '@reduxjs/toolkit';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
import history from '@history';
import _ from '@lodash';
import { setInitialSettings } from 'app/store/fuse/settingsSlice';
import { showMessage } from 'app/store/fuse/messageSlice';
import jwtService from '../services/jwtService';
import constants from '../../configs/constants';
import FuseUtils from '../../../@fuse/utils';

export const setUserDataAuth0 = (tokenData) => async (dispatch) => {
  const user = {
    role: ['admin'],
    from: 'auth0',
    data: {
      displayName: tokenData.username || tokenData.name,
      photoURL: tokenData.picture,
      email: tokenData.email,
      settings:
        tokenData.user_metadata && tokenData.user_metadata.settings
          ? tokenData.user_metadata.settings
          : {},
      shortcuts:
        tokenData.user_metadata && tokenData.user_metadata.shortcuts
          ? tokenData.user_metadata.shortcuts
          : [],
    },
  };

  return dispatch(setUserData(user));
};

export const setUserDataFirebase = (user, authUser) => async (dispatch) => {
  if (
    user &&
    user.data &&
    user.data.settings &&
    user.data.settings.theme &&
    user.data.settings.layout &&
    user.data.settings.layout.style
  ) {
    // Set user data but do not update
    return dispatch(setUserData(user));
  }

  // Create missing user settings
  return dispatch(createUserSettingsFirebase(authUser));
};

export const createUserSettingsFirebase = (authUser) => async (dispatch, getState) => {
  const guestUser = getState().auth.user;
  const fuseDefaultSettings = getState().fuse.settings.defaults;
  const { currentUser } = firebase.auth();

  /**
   * Merge with current Settings
   */
  const user = _.merge({}, guestUser, {
    uid: authUser.uid,
    from: 'firebase',
    role: ['admin'],
    data: {
      displayName: authUser.displayName,
      email: authUser.email,
      settings: { ...fuseDefaultSettings },
    },
  });
  currentUser.updateProfile(user.data);

  dispatch(updateUserData(user));

  return dispatch(setUserData(user));
};

export const setUserData = (user) => async (dispatch, getState) => {
  /*
    You can redirect the logged-in user to a specific route depending on his role
    */

  const str = window.location.pathname;
  const lastSegment = window.location.pathname.split('/').pop();
  const rest = str.substring(1, str.lastIndexOf('/') + 0);

  if (user && user.id) {
    if (rest === 'apps/invitation/validate-token') {
      dispatch(userLoggedOut()).then((res) => {
        if (res) {
          history.push(`${constants.DOMAIN}apps/invitation/validate-token/${lastSegment}`);
        } else {
          history.push(`/`);
        }
      });
    }
    if (str === '/forgot-Password' || rest === 'apps/forgot-password/validate-token') {
      history.push(`/apps/maindashboard`);
    }
  }

  if (
    window.location.pathname === '/login' ||
    // window.location.pathname === '/register' ||
    window.location.pathname === '/'
  ) {
    history.push('/apps/user/all');
    if (FuseUtils.checkPermission(user.permissions, PERMISSION.CAN_COMPANY_LIST)) {
      history.push('/apps/user/all');
    } else {
      history.push('/apps/maindashboard');
    }
  }
  dispatch(setUser(user));
};

export const updateUserSettings = (settings) => async (dispatch, getState) => {
  const oldUser = getState().auth.user;
  const user = _.merge({}, oldUser, { data: { settings } });

  dispatch(updateUserData(user));

  return dispatch(setUserData(user));
};

export const updateUserShortcuts = (shortcuts) => async (dispatch, getState) => {
  const { user } = getState().auth;
  const newUser = {
    ...user,
    data: {
      ...user.data,
      shortcuts,
    },
  };

  dispatch(updateUserData(newUser));

  return dispatch(setUserData(newUser));
};

export const logoutUser = () => async (dispatch, getState) => {
  const { user } = getState().auth;

  // if (!user.role || user.role.length === 0) {
  //   // is guest
  //   return null;
  // }

  history.push({
    pathname: '/',
  });

  switch (user.from) {
    default: {
      jwtService.logout();
    }
  }

  dispatch(setInitialSettings());

  return dispatch(userLoggedOut());
};

export const updateUserData = (user) => async (dispatch, getState) => {
  if (!user.role || user.role.length === 0) {
    // is guest
    return;
  }
  switch (user.from) {
    default: {
      jwtService
        .updateUserData(user)
        .then(() => {
          dispatch(showMessage({ message: 'User data saved with api' }));
        })
        .catch((error) => {
          dispatch(showMessage({ message: error.message }));
        });
      break;
    }
  }
};

const initialState = {};

const userSlice = createSlice({
  name: 'auth/user',
  initialState,
  reducers: {
    setUser: (state, action) => action.payload,
    userLoggedOut: (state, action) => initialState,
  },
  extraReducers: {},
});

export const { setUser, userLoggedOut } = userSlice.actions;

export default userSlice.reducer;
