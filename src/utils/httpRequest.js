import axios from 'axios';

const request = axios.create({
  baseURL: 'https://trial.mobiscroll.com/content/countries.json',
});

export const get = async () => {
  const res = await request.get();
  return res.data;
};

export default request;
