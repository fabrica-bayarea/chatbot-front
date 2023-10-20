import React from 'react';
import PropTypes from 'prop-types';

import PasswordInput from './PasswordInput';
import { MainInput, Label } from './styled';

function InputGroup({ label, name, type = 'text', ...attributes }) {
  // Render functions
  const renderInput = () => {
    if (type === 'password') {
      return <PasswordInput name={name} {...attributes} />;
    } else {
      return <MainInput type={type} id={`${name}-input`} name={name} {...attributes} />;
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
