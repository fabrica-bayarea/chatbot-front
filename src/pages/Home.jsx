import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Main, Section } from '../components/styled';
import { Chat, Dropdown, History, Logo } from '../components';
import { MainContext } from '../context';
import { devices } from '../utils';

const HomeSection = styled(Section)`
  & > div {
    height: 600px;
  }

  @media ${devices.laptopS} {
    & > div {
      height: 500px;
    }
  }
`;

function Home() {
  const { user } = useContext(MainContext);
  const navigate = useNavigate();
  const [showHistory, setShowHistory] = useState(false);

  // Login verification
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate, user]);

  return (
    <Main>
      <Logo />
      <HomeSection>
        <header>
          <span>Olá, {user?.name}! 👋</span>
          <Dropdown showFn={setShowHistory} />
        </header>
        <div>{showHistory ? <History showFn={setShowHistory} /> : <Chat />}</div>
      </HomeSection>
    </Main>
  );
}

export default Home;
