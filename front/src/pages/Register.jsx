import React, { useContext, useEffect, useState } from 'react';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';
import styled from 'styled-components';

import { InputGroup } from '../components';
import { MainButton } from '../components/styled';
import { MainContext } from '../context';
import { useValidation } from '../hooks';
import { reduceInputs } from '../utils';

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;

  & > h2 {
    font-size: 2rem;
    margin-bottom: 60px;
  }

  & > div {
    color: red;
    font-size: 0.9rem;
    height: 50px;

    svg {
      margin-right: 10px;
    }
  }
`;

const initialInputs = {
  email: ['', 'required'],
  name: ['', 'required'],
  password: ['', 'required'],
  confirmation: ['', 'required'],
};

function Register() {
  const { isLoading, register } = useContext(MainContext);
  const [inputs, setInputs] = useState(initialInputs);
  const [statusMessage, setStatusMessage] = useState('');
  const navigate = useNavigate();
  const [isValid, validationMessage] = useValidation(inputs);

  // Input handler
  const handleChange = ({ target: { name, value } }) => {
    const newValues = { ...inputs };
    newValues[name][0] = value;
    setInputs(newValues);
  };

  // Register
  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = reduceInputs(inputs);
    const [success, data] = await register(body);

    if (success) {
      navigate('/');
    } else {
      setStatusMessage(data.message);
    }
  };

  useEffect(() => {
    setStatusMessage(validationMessage);
  }, [validationMessage]);

  return (
    <main>
      <section>
        <RegisterForm onSubmit={handleSubmit}>
          <h2>Registro</h2>
          <InputGroup
            type='email'
            label='E-mail *'
            name='email'
            onChange={handleChange}
            placeholder='Digite seu e-mail...'
          />
          <InputGroup
            type='text'
            label='Primeiro nome *'
            name='name'
            onChange={handleChange}
            placeholder='Digite seu nome...'
          />
          <InputGroup
            type='password'
            label='Senha *'
            name='password'
            onChange={handleChange}
            placeholder='Digite uma senha...'
          />
          <InputGroup
            type='password'
            label='Confirmação de senha *'
            name='confirmation'
            onChange={handleChange}
            placeholder='Confirme sua senha...'
          />
          <div>
            {statusMessage && (
              <span>
                <FontAwesomeIcon icon={faTriangleExclamation} />
                {statusMessage}
              </span>
            )}
          </div>
          <MainButton type='submit' disabled={isLoading || !isValid}>
            {isLoading ? <BeatLoader size={8} /> : 'Registrar'}
          </MainButton>
        </RegisterForm>
      </section>
    </main>
  );
}

export default Register;
