import axios from 'axios';

export const swrAxiosConfig = (url) => {
  return axios.get(url).then((res) => res.data).catch((e) => e);
};
