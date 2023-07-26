import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import BeatLoader from 'react-spinners/BeatLoader';

import api from '../api';
import { InputGroup } from '../components';
import { MainButton } from '../components/styled';

const LoginForm = styled.form`
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

  & > a {
    align-self: center;
    font-size: 0.9rem;
    margin-bottom: 20px;
    width: fit-content;
  }
`;

function Login() {
  const [inputValues, setInputValues] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const result = await api.login({ ...inputValues });

      if (result.message) {
        setStatusMessage(result.message);
      }

      setIsLoading(false);
    } catch (error) {
      setStatusMessage(error.message);
      setIsLoading(false);
    }
  };

  // Field validations
  useEffect(() => {
    const REGEX = /\S+@\S+\.\S+/;
    const { email, password } = inputValues;

    if (REGEX.test(email) && password.length > 5) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [inputValues]);

  return (
    <main>
      <section>
        <LoginForm onSubmit={handleSubmit}>
          <h2>Login</h2>
          <InputGroup
            type='email'
            label='E-mail'
            name='email'
            onChange={handleChange}
            placeholder='Digite seu e-mail...'
          />
          <InputGroup
            type='password'
            label='Senha'
            name='password'
            onChange={handleChange}
            placeholder='Digite sua senha...'
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
            {isLoading ? <BeatLoader size={8} /> : 'Entrar'}
          </MainButton>
          <a href=''>Esqueci minha senha</a>
          <MainButton type='submit'>Registro</MainButton>
        </LoginForm>
      </section>
    </main>
  );
}

export default Login;
