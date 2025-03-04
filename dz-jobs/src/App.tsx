import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './components/routes';
import { HttpClientContextProvider } from './contexts/HttpClientContextProvider';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const App: React.FC = () => {
  return (

            <HttpClientContextProvider>
            {/* <ScrollToTop> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <BrowserRouter>
                  <Routes />
              </BrowserRouter>
            </LocalizationProvider>
            {/* </ScrollToTop> */}
          </HttpClientContextProvider>
  );
};

export default App;
