import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Input } from './styled';
import PasswordInput from './PasswordInput';

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 0.75rem;
  font-weight: bold;
  gap: 5px;
  text-transform: uppercase;
`;

function InputGroup({ label, name, type = 'text', ...attributes }) {
  // Render functions
  const renderInput = () => {
    if (type === 'password') {
      return <PasswordInput name={name} {...attributes} />;
    } else {
      return <Input type={type} id={`${name}-input`} name={name} {...attributes} />;
    }
  };

  // Main render
  return (
    <Label htmlFor={`${name}-input`}>
      <span>{label}</span>
      {renderInput()}
    </Label>
  );
}

InputGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  attributes: PropTypes.object,
};

export default InputGroup;
