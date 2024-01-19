import axios from '~/axios';

const userService = {
  async login(email, password) {
    const res = await axios.post('/api/auth/login-user', {
      email: email,
      password: password,
    });
    return res.data;
  },

  async register(name, email, password, confirm_password) {
    const res = await axios.post('/api/register-user', {
      name: name,
      email: email,
      password: password,
      confirm_password: confirm_password,
    });
    return res.data;
  },

  async getAllPlayers() {
    try {
      const res = await axios.get('/api/players');
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },

  async getAllCoaches() {
    try {
      const res = await axios.get('/api/coaches');
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },
};

export default userService;
