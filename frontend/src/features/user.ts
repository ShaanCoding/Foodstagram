import { createSlice } from "@reduxjs/toolkit";

let defaultUserValue = {
  name: "",
  handle: "",
  avatar: "",
  numberOfPosts: 0,
  numberOfFollowers: 0,
  numberOfFollowing: 0,
  age: 0,
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: { value: defaultUserValue },
  reducers: {
    // Login
    login: (state, action) => {
      state.value = action.payload;
    },
    // Logout
    logout: (state) => {
      state.value = defaultUserValue;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
