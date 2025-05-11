import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import Routes from './src/routes';
import { theme } from './src/theme/';

export default function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}
