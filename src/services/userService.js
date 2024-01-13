import axios from '~/axios';

const userService = {
  async login(email, password) {
    const res = await axios.post('/api/auth/login-user', {
      email: email,
      password: password,
    });
    return res.data;
  },
  async register(name, email, password) {
    const res = await axios.post('/api/register-user', {
      name: name,
      email: email,
      password: password,
    });
    return res.data;
  },
};

export default userService;
