import axios from '~/axios';

const adminService = {
  async login(user_id, password) {
    const res = await axios.post('/api/auth/login-admin', {
      user_id: user_id,
      password: password,
    });
    return res.data;
  },

  //Player
  async createPlayer(playerData) {
    try {
      const formData = new FormData();

      Object.entries(playerData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const res = await axios.post('/api/players', formData, {
        headers: {
          Authorization: `Bearer ${playerData.access_token}`,
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

  // Coach
  async createCoach(playerData) {
    try {
      const formData = new FormData();

      Object.entries(playerData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const res = await axios.post('/api/coaches', formData, {
        headers: {
          Authorization: `Bearer ${playerData.access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      return res.data;
    } catch (error) {
      console.error('Error creating player:', error);
      throw error;
    }
  },
  // async createCoach(formData, access_token) {
  //   try {
  //     const res = await axios.post('/api/coaches', formData, {
  //       headers: {
  //         Authorization: `Bearer ${access_token}`,
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
  //     return res.data;
  //   } catch (error) {
  //     console.error('Error creating coach:', error);
  //     throw error;
  //   }
  // },

  async getOneCoach(user_id) {
    try {
      const res = await axios.get(`api/coaches/id/${user_id}`);
      return res.data;
    } catch (error) {
      console.log(error.message);
    }
  },

  async updateCoach(user_id, formData, access_token) {
    try {
      const res = await axios.post(`/api/coaches/${user_id}`, formData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (error) {
      console.error('Error creating coach:', error);
      throw error;
    }
  },

  async deleteCoach(user_id, access_token) {
    const res = await axios.delete(`api/coaches/${user_id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return res.data;
  },

  //Clubs 
  async createClub(clubData) {
    try {
      const formData = new FormData();

      Object.entries(clubData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const res = await axios.post('/api/clubs', formData, {
        headers: {
          Authorization: `Bearer ${clubData.access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      return res.data;
    } catch (error) {
      console.error('Error creating club:', error);
      throw error;
    }
  },

  async getOneClub(club_id) {
    try {
      const res = await axios.get(`api/clubs/${club_id}`);
      return res.data;
    } catch (error) {
      console.log(error.message);
    }
  },

  async updateClub(club_id, formData, access_token) {
    try {
      const res = await axios.post(`/api/clubs/${club_id}`, formData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (error) {
      console.error('Error update club:', error);
      throw error;
    }
  },

  async deleteClub(club_id, access_token) {
    const res = await axios.delete(`api/clubs/${club_id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return res.data;
  },

  // Stadiums
  async getAllStadiums() {
    try {
      const res = await axios.get('/api/stadiums');
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },

  async createStadium(stadiumData) {
    try {
      const formData = new FormData();

      Object.entries(stadiumData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const res = await axios.post('/api/stadiums', formData, {
        headers: {
          Authorization: `Bearer ${stadiumData.access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      return res.data;
    } catch (error) {
      console.error('Error creating stadium:', error);
      throw error;
    }
  },

  async getOneStadium(stadium_id) {
    try {
      const res = await axios.get(`api/stadiums/${stadium_id}`);
      return res.data;
    } catch (error) {
      console.log(error.message);
    }
  },

  async updateStadium(stadium_id, formData, access_token) {
    try {
      const res = await axios.post(`/api/stadiums/${stadium_id}`, formData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (error) {
      console.error('Error update stadium:', error);
      throw error;
    }
  },

  async deleteStadium(stadium_id, access_token) {
    const res = await axios.delete(`api/stadiums/${stadium_id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return res.data;
  },

};

export default adminService;
