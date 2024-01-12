import axios from '~/axios';

const userService = {
  async login(user_id, password) {
    const res = await axios.post('/api/auth/login', {
      user_id: user_id,
      password: password,
    });
    return res.data;
  },
};

export default userService;
