const token = localStorage.getItem('jwt_access_token');

const fetcher = (url, options) =>
  fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`, // Replace token with your authorization token
      ...options.headers,
    },
  }).then((res) => res.json());

export default fetcher;
