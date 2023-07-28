import React, { useState } from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Button, Input } from './styled';

const Container = styled.div`
  position: relative;

  input {
    padding-right: 50px;
  }

  button {
    aspect-ratio: 2 / 1;
    border-left: 1px solid lightgray;
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translate(0, -50%);
    width: 40px;
  }
`;

function PasswordInput({ name, ...attributes }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Container>
      <Input
        type={showPassword ? 'text' : 'password'}
        id={`${name}-input`}
        name={name}
        {...attributes}
      />
      <Button type='button' onClick={() => setShowPassword(!showPassword)}>
        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
      </Button>
    </Container>
  );
}

PasswordInput.propTypes = {
  name: PropTypes.string.isRequired,
  attributes: PropTypes.object,
};

export default PasswordInput;
