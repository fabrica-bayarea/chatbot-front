import React, { useContext, useEffect } from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

import { Button, Main, Section } from '../components/styled';
import { Chat, Logo } from '../components';
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
          <Button type='button'>
            <FontAwesomeIcon icon={faBars} />
          </Button>
        </header>
        <div>
          <Chat />
        </div>
      </Section>
    </Main>
  );
}

export default Home;
