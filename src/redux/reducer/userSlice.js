import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogInEd: false,
    userData: {},
    access_token: '',
    role_id: null,
  },
  reducers: {
    toggleUserLogin(state, actions) {
      if (actions.payload === true) {
        state.isLogInEd = actions.payload;
      } else {
        state.isLogInEd = !state.isLogInEd;
      }
    },
    saveUserLogin(state, actions) {
      state.userData = actions.payload;
      state.access_token = actions.payload.access_token;
    },

    saveRoleId(state, actions) {
      state.role_id = actions.payload.role_id;
    },

    logOutUser(state, actions) {
      state.access_token = '';
      state.role_id = '';
    },
  },
});

export default userSlice;
