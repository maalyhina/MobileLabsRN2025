import React, { useState } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import BottomTabs from './navigation/BottomTabs';

const CustomLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    card: '#ffffff',
    text: '#000000',
    border: '#cccccc',
    background: '#f0f0f0',
  },
};

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    card: '#1f1f1f',
    text: '#ffffff',
    border: '#444444',
    background: '#1C202C',
  },
};

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const theme = isDarkTheme ? CustomDarkTheme : CustomLightTheme;

  return (
      <NavigationContainer theme={theme}>
        <ThemeProvider theme={theme}>
          <BottomTabs isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme} />
        </ThemeProvider>
      </NavigationContainer>
  );
}
