import FuseUtils from '@fuse/utils/FuseUtils';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import constants from 'app/fuse-configs/constants';

/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.request.use((config) => {
      config.baseURL = constants.API_URL;
      return config;
    });

    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise(() => {
          if (
            err.response &&
            err.response.status === 401 &&
            err.config &&
            !err.config.__isRetryRequest
          ) {
            this.emit('onAutoLogout', 'Invalid access_token');
            this.setSession(null);
          }
          if (
            err.response &&
            err.response.status === 500 &&
            err.config &&
            !err.config.__isRetryRequest
          ) {
            this.emit('serverError', 'Server Error, Please try again.');
          }
          throw err;
        });
      }
    );
  };

  handleAuthentication = () => {
    const access_token = this.getAccessToken();

    if (!access_token) {
      this.emit('onNoAccessToken');

      return;
    }

    if (this.isAuthTokenValid(access_token)) {
      this.setSession(access_token);
      this.emit('onAutoLogin', true);
    } else {
      this.setSession(null);
      this.emit('onAutoLogout', 'access_token expired');
    }
  };

  createUser = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/auth/register', data)
        .then((response) => {
          if (response.data.user) {
            this.setSession(response.data.accessToken);
            resolve({ ...response.data.user, permissions: response.data.permissions });
          } else {
            reject(response.data.error);
          }
        })
        .catch((error) => {
          const errors = [];
          if (error.response === undefined) {
            errors.push({
              type: 'email',
              message: 'Something is wrong! Please contact your administrator.',
            });
          } else {
            errors.push({ type: 'email', message: error.response.data.errors.email });
          }
          reject(errors);
        });
    });
  };

  signInWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/auth/login', {
          email,
          password,
        })
        .then((response) => {
          if (response.data.user) {
            this.setSession(response.data.accessToken);
            resolve({ ...response.data.user, permissions: response.data.permissions });
          } else {
            reject(response.data.error);
          }
        })
        .catch((error) => {
          const errors = [];
          if (error.response === undefined) {
            errors.push({
              type: 'password',
              message: 'Something is wrong! Please contact your administrator.',
            });
          } else {
            errors.push({ type: 'password', message: error.response.data.message });
          }
          reject(errors);
        });
    });
  };

  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/auth/refresh', {
          data: {
            access_token: this.getAccessToken(),
          },
        })
        .then((response) => {
          if (response.data.user) {
            this.setSession(response.data.accessToken);
            resolve({ ...response.data.user, permissions: response.data.permissions });
          } else {
            this.logout();
            reject(new Error('Failed to login with token.'));
          }
        })
        .catch((error) => {
          this.logout();
          reject(new Error('Failed to login with token.'));
        });
    });
  };

  updateUserData = (user) => {
    return axios.post('/api/auth/user/update', {
      user,
    });
  };

  setSession = (access_token) => {
    if (access_token) {
      localStorage.setItem('jwt_access_token', access_token);
      axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    } else {
      localStorage.removeItem('jwt_access_token');
      delete axios.defaults.headers.common.Authorization;
    }
  };

  logout = () => {
    this.setSession(null);
  };

  isAuthTokenValid = (access_token) => {
    if (!access_token) {
      return false;
    }
    const decoded = jwtDecode(access_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn('access token expired');
      return false;
    }

    return true;
  };

  getAccessToken = () => {
    return window.localStorage.getItem('jwt_access_token');
  };
}

const instance = new JwtService();

export default instance;
