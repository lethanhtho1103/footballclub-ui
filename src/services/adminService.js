import axios from '~/axios';

const adminService = {
  async login(user_id, password) {
    const res = await axios.post('/api/auth/login-admin', {
      user_id: user_id,
      password: password,
    });
    return res.data;
  },

  async createPlayer(formData, access_token) {
    try {
      const res = await axios.post('/api/players', formData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (error) {
      console.error('Error creating player:', error);
      throw error;
    }
  },

  async getOnePlayer(user_id) {
    try {
      const res = await axios.get(`api/players/id/${user_id}`);
      return res.data.player;
    } catch (error) {
      console.log(error.message);
    }
  },

  async updatePlayer(user_id, formData, access_token) {
    try {
      const res = await axios.post(`/api/players/${user_id}`, formData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Updating player');
      return res.data;
    } catch (error) {
      console.error('Error creating player:', error);
      throw error;
    }
  },

  async deletePlayer(user_id, access_token) {
    const res = await axios.delete(`api/players/${user_id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return res.data;
  },
};

export default adminService;
