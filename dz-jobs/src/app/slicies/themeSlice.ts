import { createSlice } from '@reduxjs/toolkit';

interface ThemeState {
  darkMode: boolean;
}

// Load dark mode from localStorage (if exists)
const storedTheme = localStorage.getItem('darkMode');
const initialState: ThemeState = {
  darkMode: storedTheme ? JSON.parse(storedTheme) : false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', JSON.stringify(state.darkMode)); // Save to localStorage
    },
  },
});

export const { toggleDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
