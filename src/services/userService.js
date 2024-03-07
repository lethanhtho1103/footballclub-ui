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

  async getOneCoach({ name }) {
    if (name) {
      const res = await axios.get(`/api/coaches/${name}`);
      return res.data;
    }

    return 'Thiếu tham số truyền vào';
  },

  async getOnePlayer({ name }) {
    if (name) {
      const res = await axios.get(`/api/players/${name}`);
      return res.data;
    }

    return 'Thiếu tham số truyền vào';
  },

  async getInfoUser({ access_token }) {
    if (access_token) {
      try {
        const res = await axios.post(
          'api/auth/me',
          {},
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          },
        );
        return res.data;
      } catch (error) {
        console.error('Lỗi khi gửi yêu cầu:', error);
        // Xử lý lỗi nếu cần
      }
    }
    return 'Thiếu tham số truyền vào';
  },

  async getAllMatches() {
    try {
      const res = await axios.get('api/matches');
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },

  async getAllMatchesComingUp() {
    try {
      const res = await axios.get('api/match-comeup');
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },

  async getAllMatchesHistory() {
    try {
      const res = await axios.get('/api/match-history');
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },

  async getOneMatch(game_id) {
    try {
      const res = await axios.get(`/api/matches/${game_id}`);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },

  async getAllSeats() {
    try {
      const res = await axios.get('api/seats');
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },
};

export default userService;
