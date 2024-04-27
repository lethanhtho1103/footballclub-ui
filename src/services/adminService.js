import axios from '~/axios';

const adminService = {
  async login(user_id, password) {
    const res = await axios.post('/api/auth/login-admin', {
      user_id: user_id,
      password: password,
    });
    return res.data;
  },

  // Dashboard
  async getDashboard() {
    try {
      const res = await axios.get('api/count-all-users');
      return res.data;
    } catch (error) {
      console.log(error.message);
    }
  },

  // Users
  async getAllUser() {
    try {
      const res = await axios.get('api/users/all');
      return res.data.users;
    } catch (error) {
      console.log(error.message);
    }
  },

  // Accounts-users
  async getAllAccountUsers() {
    try {
      const res = await axios.get('api/users');
      return res.data;
    } catch (error) {
      console.log(error.message);
    }
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
  async createCoach(coachData) {
    try {
      const formData = new FormData();

      Object.entries(coachData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const res = await axios.post('/api/coaches', formData, {
        headers: {
          Authorization: `Bearer ${coachData.access_token}`,
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

  // Company
  async getAllCompany() {
    try {
      const res = await axios.get('/api/company');
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },

  async createCompany(companyData) {
    try {
      const formData = new FormData();

      Object.entries(companyData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const res = await axios.post('/api/company', formData, {
        headers: {
          Authorization: `Bearer ${companyData.access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      return res.data;
    } catch (error) {
      console.error('Error creating company:', error);
      throw error;
    }
  },

  async getOneCompany(company_id) {
    try {
      const res = await axios.get(`api/company/${company_id}`);
      return res.data;
    } catch (error) {
      console.log(error.message);
    }
  },

  async updateCompany(company_id, formData, access_token) {
    try {
      const res = await axios.post(`/api/company/${company_id}`, formData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (error) {
      console.error('Error update company:', error);
      throw error;
    }
  },

  async deleteCompany(company_id, access_token) {
    const res = await axios.delete(`api/company/${company_id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return res.data;
  },

  //Clubs
  async getAllClubs() {
    try {
      const res = await axios.get('/api/clubs');
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },

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

  //Seats
  async getAllSeats() {
    try {
      const res = await axios.get('/api/seats');
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },

  async createSeats(seatsData) {
    try {
      const formData = new FormData();
      Object.entries(seatsData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const res = await axios.post('/api/seats/create', formData, {
        headers: {
          Authorization: `Bearer ${seatsData.access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      return res.data;
    } catch (error) {
      console.error('Error creating stadium:', error);
      throw error;
    }
  },

  async updateSeats(seatsData) {
    try {
      const formData = new FormData();
      Object.entries(seatsData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const res = await axios.post('/api/seats/update', formData, {
        headers: {
          Authorization: `Bearer ${seatsData.access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      return res.data;
    } catch (error) {
      console.error('Error creating stadium:', error);
      throw error;
    }
  },

  async deleteSeats(seatsData) {
    try {
      const formData = new FormData();
      Object.entries(seatsData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const res = await axios.post('/api/seats/delete', formData, {
        headers: {
          Authorization: `Bearer ${seatsData.access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      return res.data;
    } catch (error) {
      console.error('Error creating stadium:', error);
      throw error;
    }
  },

  // Contracts
  async getAllContracts() {
    try {
      const res = await axios.get('/api/contracts');
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },

  async createContract(contractData) {
    try {
      const formData = new FormData();

      Object.entries(contractData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const res = await axios.post('/api/contracts', formData, {
        headers: {
          Authorization: `Bearer ${contractData.access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      return res.data;
    } catch (error) {
      console.error('Error creating contract:', error);
      throw error;
    }
  },

  async getOneContract(contract_id) {
    try {
      const res = await axios.get(`api/contracts/${contract_id}`);
      return res.data;
    } catch (error) {
      console.log(error.message);
    }
  },

  async getOneContractByType(contract_type) {
    try {
      const res = await axios.get(`api/contracts/type/${contract_type}`);
      return res.data;
    } catch (error) {
      console.log(error.message);
    }
  },

  async updateContract(contract_id, formData, access_token) {
    try {
      const res = await axios.post(`/api/contracts/${contract_id}`, formData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (error) {
      console.error('Error update contract:', error);
      throw error;
    }
  },

  async deleteContract(contract_id, access_token) {
    const res = await axios.delete(`api/contracts/${contract_id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return res.data;
  },

  // Matches
  async getAllMatches() {
    try {
      const res = await axios.get('/api/matches');
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },

  async createMatch(matchData) {
    try {
      const formData = new FormData();

      Object.entries(matchData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const res = await axios.post('/api/matches', formData, {
        headers: {
          Authorization: `Bearer ${matchData.access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      return res.data;
    } catch (error) {
      console.error('Error creating match:', error);
      throw error;
    }
  },

  async getOneMatch(match_id) {
    try {
      const res = await axios.get(`api/matches/${match_id}`);
      return res.data;
    } catch (error) {
      console.log(error.message);
    }
  },

  async getOneMatchByType(match_type) {
    try {
      const res = await axios.get(`api/matches/type/${match_type}`);
      return res.data;
    } catch (error) {
      console.log(error.message);
    }
  },

  async updateMatch(match_id, formData, access_token) {
    try {
      const res = await axios.post(`/api/matches/${match_id}`, formData, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (error) {
      console.error('Error update match:', error);
      throw error;
    }
  },

  async deleteMatch(match_id, access_token) {
    const res = await axios.delete(`api/matches/${match_id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return res.data;
  },

  async createMatchDetail(data) {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const res = await axios.post('/api/match-detail', formData, {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      return res.data;
    } catch (error) {
      console.error('Error creating match:', error);
      throw error;
    }
  },

  async getMatchLive(date, time) {
    try {
      const res = await axios.get(`/api/match-live`);
      return res.data;
    } catch (error) {
      console.log(error.message);
    }
  },

  //Statistical
  async getStatisticalByYear(year) {
    try {
      const res = await axios.get(`/api/revenue-per-month?year=${year}`);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },

  async getStatisticalByMonth(month, year) {
    try {
      const res = await axios.get(`api/gameTickets?month=${month}&year=${year}`);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },

  async getSalaryByYear(year) {
    try {
      const res = await axios.get(`/api/salary-report/${year}`);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },

  async getSalaryByMonth(month, year) {
    try {
      const res = await axios.get(`api/salary-payments/${month}/${year}`);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },

  async updateReceivedSalary(salaryId, access_token) {
    const res = await axios.post(`api/salary-payments/receive/${salaryId}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return res.data;
  },

  // Tickets
  async getAllTickets() {
    try {
      const res = await axios.get('api/tickets');
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },

  async getAllUserOfMatch(gameId) {
    try {
      const res = await axios.get(`/api/tickets/match/${gameId}`);
      return res.data;
    } catch (error) {
      console.log('Get all ticket purchase errors:', error);
    }
  },
};

export default adminService;
