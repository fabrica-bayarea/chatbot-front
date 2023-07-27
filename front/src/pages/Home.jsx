import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import MainContext from '../context/MainContext';
import { Chat } from '../components';

function Home() {
  const { user } = useContext(MainContext);
  const navigate = useNavigate();

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
