import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    isLogged: false,
    user: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
      state.isLogged = true;
    },
    clearToken: (state) => {
      state.token = null;
      state.isLogged = false;
      state.user = null;
      localStorage.removeItem('token');
    },
    setUserData: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setToken, clearToken, setUserData  } = authSlice.actions;

export default authSlice.reducer;
