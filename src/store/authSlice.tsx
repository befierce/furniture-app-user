import { createSlice } from "@reduxjs/toolkit";

interface initialStateInterface {
  isLoggedIn: boolean;
}

const initialState: initialStateInterface = {
  isLoggedIn: false,
};

const authSLice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state) => {
      state.isLoggedIn = true;
    },
  },
});

export default authSLice.reducer;
export const { setLogin } = authSLice.actions;
