import axios from 'axios';

const request = axios.create({
  baseURL: 'https://restcountries.com/v3.1/all',
});

export const get = async () => {
  const res = await request.get();
  return res.data;
};

export default request;
