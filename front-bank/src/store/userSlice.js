import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: null,
    infos: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.infos = action.payload;
    },
  },
});

export const { setToken, setUser } = userSlice.actions;

export default userSlice.reducer;
