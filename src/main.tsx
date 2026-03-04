import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline></CssBaseline>
    <App />
    </ThemeProvider>
  </StrictMode>,
)
