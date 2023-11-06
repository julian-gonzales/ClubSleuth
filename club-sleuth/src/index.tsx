import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home-page';
import ClubPage from './pages/club-page';
import SearchPage from './pages/search-page';
import { Provider } from 'react-redux';
import { store } from './store';
import theme from './theme';
import SignInPage from './pages/sign-in-page';
import SignUpPage from './pages/sign-up-page';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/clubs/:province/:city' element={<SearchPage />} />
            <Route path='/clubs/:id' element={<ClubPage />} />
            <Route path='/sign-in' element={<SignInPage />} />
            <Route path='/sign-up' element={<SignUpPage />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
