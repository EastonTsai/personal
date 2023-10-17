import 'App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from 'pages/AdminPage';
import LoginPage from 'pages/LoginPage';

const basename = process.env.PUBLIC_URL

const App = () => {
  return (
    <div className="App font-sans pt-8">
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path='/admin' element={<AdminPage />} />
          {/* <Route path='/login' element={<LoginPage />} /> */}
          <Route path='/' element={<HomePage />} />
        </Routes>
        S
      </BrowserRouter>
    </div>
  );
}

export default App;
