import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkMode: false,
  value: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload
    },
    toogleTheme: (state, action) => {
      state.isDarkMode = action.payload;
    }
  },
});

export const { setUser, toogleTheme } = userSlice.actions;

export default userSlice.reducer;
