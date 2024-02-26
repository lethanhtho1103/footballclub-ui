import axios from '~/axios';

const adminService = {
  async login(user_id, password) {
    const res = await axios.post('/api/auth/login-admin', {
      user_id: user_id,
      password: password,
    });
    return res.data;
  },

  async createPlayer(
    access_token,
    name,
    email,
    password,
    date_of_birth,
    nationality,
    position,
    jersey_number,
    image,
    flag,
    detail,
  ) {
    try {
      console.log(image);
      const res = await axios.post(
        '/api/players',
        {
          name: name,
          password: password,
          email: email,
          date_of_birth: date_of_birth,
          nationality: nationality,
          position: position,
          jersey_number: jersey_number,
          detail: detail,
          image: image,
          flag: flag,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json', // You may need to adjust the content type based on your API requirements
          },
        },
      );
      return res.data;
    } catch (error) {
      console.error('Error creating player:', error);
      throw error; // Re-throw the error to propagate it further
    }
  },

  async deletePlayer(user_id) {
    const res = await axios.delete(`api/players/${user_id}`);
    return res.data;
  },
};

export default adminService;
