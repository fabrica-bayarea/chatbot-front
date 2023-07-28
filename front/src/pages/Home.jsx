import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Chat } from '../components';
import MainContext from '../context/MainContext';

function Home() {
  const { user } = useContext(MainContext);
  const navigate = useNavigate();

  // Login verification
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate, user]);

  return (
    <main>
      <Chat />
    </main>
  );
}

export default Home;
