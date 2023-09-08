import 'App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from 'pages/AdminPage';

const basename = process.env.PUBLIC_URL
const App = () => {
  return (
    <div className="App font-sans">
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path='/admin' element={<AdminPage />} />
          <Route path='/' element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
