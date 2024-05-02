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
  async getDashboard(access_token) {
    try {
      const res = await axios.get('api/count-all-users', {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (error) {
      console.log(error.message);
    }
  },

  // Users
  async getAllUser(access_token) {
    try {
      const res = await axios.get('api/users/all', {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data.users;
    } catch (error) {
      console.log(error.message);
    }
  },

  // Accounts-users
  async getAllAccountUsers(access_token) {
    try {
      const res = await axios.get('api/users', {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
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

  async getOnePlayer(user_id, access_token) {
    try {
      const res = await axios.get(`api/players/id/${user_id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
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

  async getOneCoach(user_id, access_token) {
    try {
      const res = await axios.get(`api/coaches/id/${user_id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
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
  async getAllCompany(access_token) {
    try {
      const res = await axios.get('/api/company', {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
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

  async getOneCompany(company_id, access_token) {
    try {
      const res = await axios.get(`api/company/${company_id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
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
  async getAllClubs(access_token) {
    try {
      const res = await axios.get('/api/clubs', {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
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

  async getOneClub(club_id, access_token) {
    try {
      const res = await axios.get(`api/clubs/${club_id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
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
  async getAllStadiums(access_token) {
    try {
      const res = await axios.get('/api/stadiums', {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
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

  async getOneStadium(stadium_id, access_token) {
    try {
      const res = await axios.get(`api/stadiums/${stadium_id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
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
  async getAllSeats(access_token) {
    try {
      const res = await axios.get('/api/seats', {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
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
  async getAllContracts(access_token) {
    try {
      const res = await axios.get('/api/contracts', {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
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

  async getOneContract(contract_id, access_token) {
    try {
      const res = await axios.get(`api/contracts/${contract_id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (error) {
      console.log(error.message);
    }
  },

  async getOneContractByType(contract_type, access_token) {
    try {
      const res = await axios.get(`api/contracts/type/${contract_type}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
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
  async getAllMatches(access_token) {
    try {
      const res = await axios.get('/api/matches', {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
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

  async getOneMatch(match_id, access_token) {
    try {
      const res = await axios.get(`api/matches/${match_id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (error) {
      console.log(error.message);
    }
  },

  async getOneMatchByType(match_type, access_token) {
    try {
      const res = await axios.get(`api/matches/type/${match_type}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
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

  async deleteDetailMatchLive(id, access_token) {
    try {
      const res = await axios.delete(`/api/match-detail/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (error) {
      console.log(error.message);
    }
  },

  async getMatchLive(access_token) {
    try {
      const res = await axios.get(`/api/match-live`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (error) {
      console.log(error.message);
    }
  },

  async stopMatchLive(id, access_token) {
    try {
      console.log(id);
      console.log(access_token);
      const res = await axios.post(`/api/stopMatch/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      return res;
    } catch (error) {
      console.log(error.message);
    }
  },

  //Statistical
  async getStatisticalByYear(year, access_token) {
    try {
      const res = await axios.get(`/api/revenue-per-month?year=${year}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },

  async getStatisticalByMonth(month, year, access_token) {
    try {
      const res = await axios.get(`api/gameTickets?month=${month}&year=${year}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },

  async getSalaryByYear(year, access_token) {
    try {
      const res = await axios.get(`/api/salary-report/${year}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },

  async getSalaryByMonth(month, year, access_token) {
    try {
      const res = await axios.get(`api/salary-payments/${month}/${year}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
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

  async getPaymentCompanyByYear(year, access_token) {
    try {
      const res = await axios.get(`/api/company-report/${year}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },

  async getPaymentCompanyByMonth(month, year, access_token) {
    try {
      const res = await axios.get(`api/company-payments/${month}/${year}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },

  // Tickets
  async getAllTickets(access_token) {
    try {
      const res = await axios.get('api/tickets', {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },

  async getAllUserOfMatch(gameId, access_token) {
    try {
      const res = await axios.get(`/api/tickets/match/${gameId}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (error) {
      console.log('Get all ticket purchase errors:', error);
    }
  },
};

export default adminService;
