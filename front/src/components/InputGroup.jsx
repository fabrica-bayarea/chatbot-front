import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import PasswordInput from './PasswordInput';
import { Input } from './styled';

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
  gap: 5px;
`;

function InputGroup({
  defaultValue,
  label,
  name,
  onChange,
  placeholder,
  type = 'text',
  value,
}) {
  // Render functions
  const renderInput = () => {
    if (type === 'password') {
      return (
        <PasswordInput
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          value={value}
        />
      );
    } else {
      return (
        <Input
          type={type}
          defaultValue={defaultValue}
          id={`${name}-input`}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          value={value}
        />
      );
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
  defaultValue: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
};

export default InputGroup;
