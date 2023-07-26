import React, { useState } from 'react';
import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

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

function PasswordInput({ name, onChange, placeholder, value }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Container>
      <Input
        type={showPassword ? 'text' : 'password'}
        id={`${name}-input`}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
      <Button type='button' onClick={() => setShowPassword(!showPassword)}>
        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
      </Button>
    </Container>
  );
}

PasswordInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

export default PasswordInput;
