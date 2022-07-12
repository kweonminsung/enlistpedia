import React, { useState, useEffect } from 'react';
import Main from './components/Main/Main';
import Header from './components/Header/Header';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { ThemeContext } from './context/ThemeContext';
import { AppContainer } from './App.styles';
import axios from 'axios';
import { SERVER_URL } from './constants/endpoints';

axios.defaults.baseURL = SERVER_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const theme: string | null | undefined =
      window.localStorage.getItem('theme');
    if (theme === undefined) {
      setIsDarkMode(true);
    } else if (theme === 'true') {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    window.localStorage.setItem('theme', !isDarkMode ? 'true' : 'false');
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      <BrowserRouter>
        <AppContainer isDarkMode={isDarkMode}>
          <Header />
          <Routes>
            <Route path="/" element={<Main />}></Route>
          </Routes>
        </AppContainer>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;
