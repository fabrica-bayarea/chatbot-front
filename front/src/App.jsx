import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Home, Login, NotFound, Register } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registro' element={<Register />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
