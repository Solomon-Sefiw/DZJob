import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the state type
interface AuthState {
  userId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role?: string;
  isAuthenticated : boolean
}

// Initial state
const initialState: AuthState = {
  userId: "",
  email: "",
  username: "",
  firstName: "",
  lastName: "",
  role: "",
  isAuthenticated : false
};

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: loadUserDataFromLocalStorage() || initialState,
  reducers: {
    // Action to set user details
    setUser: (state, action: PayloadAction<AuthState>) => {
      const { userId, email, username, firstName, lastName, role,isAuthenticated } = action.payload;
      state.userId = userId;
      state.email = email;
      state.username = username;
      state.firstName = firstName;
      state.lastName = lastName;
      state.role = role;
      state.isAuthenticated = isAuthenticated;

      // Save user data to local storage
      localStorage.setItem("user", JSON.stringify(state));
    },

    // Action to log out and clear user data
    logout: (state) => {
      state.userId = "";
      state.email = "";
      state.username = "";
      state.firstName = "";
      state.lastName = "";
      state.role = "";
      state.isAuthenticated = false

      // Clear user data from local storage
      localStorage.removeItem("user");
    },
  },
});

// Load user data from local storage
function loadUserDataFromLocalStorage(): AuthState | null {
  const userData = localStorage.getItem("user");
  return userData ? JSON.parse(userData) : null;
}

// Export actions
export const { setUser, logout } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
