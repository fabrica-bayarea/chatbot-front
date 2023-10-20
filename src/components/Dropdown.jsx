import React, { useContext, useEffect, useRef, useState } from 'react';
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { DropdownButton, IconButton } from './styled';
import { ChatContext, MainContext } from '../context';

const Container = styled.div`
  position: relative;
`;

const ToggleButton = styled(IconButton)`
  color: var(--clr-light);
  font-size: 2em;
  position: relative;
  z-index: 100;
`;

const Navigation = styled.nav`
  border: 1px solid var(--clr-c);
  box-shadow: 0 0 2px 0 rgb(0 0 0 / 20%);
  display: flex;
  flex-direction: column;
  opacity: 0;
  position: absolute;
  right: 0;
  top: 30px;
  transition: opacity 400ms ease, top 400ms ease, visibility 400ms ease;
  visibility: hidden;
  width: 180px;
  z-index: 10;

  ${(props) =>
    props.$visibility &&
    css`
      opacity: 1;
      top: 50px;
      visibility: visible;
    `}
`;

function Dropdown({ showFn }) {
  const { changeConversation } = useContext(ChatContext);
  const { logout } = useContext(MainContext);
  const navigate = useNavigate();
  const toggleRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  // Listen for click events outside the button to close the menu
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isVisible && !toggleRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isVisible]);

  return (
    <Container>
      <ToggleButton
        type='button'
        onClick={() => setIsVisible(!isVisible)}
        ref={toggleRef}
      >
        <FontAwesomeIcon icon={isVisible ? faClose : faBars} />
      </ToggleButton>
      <Navigation $visibility={isVisible}>
        <DropdownButton
          type='button'
          onClick={() => {
            changeConversation();
            showFn(false);
          }}
        >
          Nova conversa
        </DropdownButton>
        <DropdownButton
          type='button'
          onClick={() => {
            showFn(true);
          }}
        >
          Histórico
        </DropdownButton>
        <DropdownButton
          type='button'
          onClick={() => {
            logout();
            navigate('/login');
          }}
        >
          Sair
        </DropdownButton>
      </Navigation>
    </Container>
  );
}

Dropdown.propTypes = {
  showFn: PropTypes.func,
};

export default Dropdown;
