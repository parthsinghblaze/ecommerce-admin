import axios from "axios";

export const getCategory = (url) => {
  return axios.get(url).then((res) => res.data);
}

