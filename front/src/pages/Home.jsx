import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Main, Section } from '../components/styled';
import { Chat, Dropdown, Logo } from '../components';
import { MainContext } from '../context';

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
    <Main>
      <Logo />
      <Section>
        <header>
          <span>Olá, {user?.name}! 👋</span>
          <Dropdown />
        </header>
        <div>
          <Chat />
        </div>
      </Section>
    </Main>
  );
}

export default Home;
