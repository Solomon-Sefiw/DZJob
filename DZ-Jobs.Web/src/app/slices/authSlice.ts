import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the state type
interface AuthState {
  userId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
}

// Initial state
const initialState: AuthState = {
  userId: "",
  email: "",
  username: "",
  firstName: "",
  lastName: "",
};

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to set user details
    setUser: (state, action: PayloadAction<AuthState>) => {
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },

    // Action to log out and clear user data
    logout: (state) => {
      state.userId = "";
      state.email = "";
      state.username = "";
      state.firstName = "";
      state.lastName = "";
    },
  },
});

// Export actions
export const { setUser, logout } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
