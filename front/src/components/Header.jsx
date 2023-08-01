import React from 'react';
import styled from 'styled-components';

const Container = styled.header`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 4vh 0;
`;

const Logo = styled.div`
  align-items: center;
  background: var(--gradient-a);
  border-radius: 50px;
  border-bottom-left-radius: 0;
  display: flex;
  height: 100px;
  justify-content: center;
  width: 180px;

  & > div {
    background-color: var(--clr-light);
    border-radius: 30px;
    height: 60px;
    position: relative;
    width: 140px;

    &::before,
    &::after {
      aspect-ratio: 1;
      background-color: var(--clr-a);
      border-radius: 50%;
      content: '';
      position: absolute;
      top: 20px;
      width: 20px;
    }

    &::before {
      left: 30px;
    }

    &::after {
      right: 30px;
    }
  }
`;

function Header() {
  return (
    <Container>
      <Logo>
        <div></div>
      </Logo>
      <h1>Chatbot</h1>
    </Container>
  );
}

export default Header;
