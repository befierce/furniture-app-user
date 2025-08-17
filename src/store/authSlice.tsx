import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserData {
  uid: string;
  name?: string;
  email?: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: UserData | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<UserData>) => {
      state.isLoggedIn = true;
      state.user = action.payload; 
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export default authSlice.reducer;
export const { setLogin, logout } = authSlice.actions;
