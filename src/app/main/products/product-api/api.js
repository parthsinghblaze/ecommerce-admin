import axios from 'axios';

export const getProducts = (url) => {
  return axios.get(url).then((res) => res.data).catch((e) => e);
};
