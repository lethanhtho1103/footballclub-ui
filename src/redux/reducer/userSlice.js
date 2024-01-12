import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogInEd: false,
    isManager: false,
    userData: {},
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
      state.isManager = actions.payload.type === 'admin' ? true : false;
    },
  },
});

export default userSlice;
