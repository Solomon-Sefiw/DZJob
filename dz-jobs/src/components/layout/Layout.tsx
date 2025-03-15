
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { CssBaseline, Grid, ThemeProvider } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { customTheme } from '../../styles/theme';

const Layout = () => {
  const darkMode = useAppSelector((state) => state.theme.darkMode);

  return (
    <ThemeProvider theme={customTheme(darkMode)}>
      <CssBaseline />
      <Header />
      <Grid style={{ minHeight: 'calc(100vh - 200px)', padding: '20px' }}>
        <Outlet />
      </Grid>
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;
